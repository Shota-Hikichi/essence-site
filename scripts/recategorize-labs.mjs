#!/usr/bin/env node
/**
 * Essence Lab 記事のカテゴリ自動振り分けスクリプト
 *
 * microCMS から全記事を取得し、タイトル＋抜粋から Claude で分類、
 * category フィールドを PATCH で更新する。
 *
 * 実行:
 *   node scripts/recategorize-labs.mjs --dry   # 変更せずにプレビュー
 *   node scripts/recategorize-labs.mjs         # 実行
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) {
      let v = m[2];
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      if (!process.env[m[1]]) process.env[m[1]] = v;
    }
  });
}

const SERVICE = process.env.MICROCMS_LAB_SERVICE_DOMAIN || 'eslab';
const KEY = process.env.MICROCMS_LAB_API_KEY || process.env.MICROCMS_LAB_WRITE_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DRY = process.argv.includes('--dry');

if (!KEY || !ANTHROPIC_API_KEY) {
  console.error('.env.local に MICROCMS_LAB_API_KEY と ANTHROPIC_API_KEY を設定してください');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const CATEGORIES = ['一般', '英語', '勉強法', '科目', '国語', '受験', '日本史', '計画', '社会', '社会科', '英語・国語・日本史'];

const SYSTEM = `あなたは受験コンテンツの分類エキスパートです。以下のカテゴリから、各記事に最も適切なもの**1つだけ**を選んでください。

カテゴリ一覧（この中から必ず1つ選ぶ）：
${CATEGORIES.map((c) => `- ${c}`).join('\n')}

分類ルール：
- 「英語」: 英語科目の解き方・長文・リスニング・単語・英文法など、英語に特化した内容
- 「国語」: 現代文・古文・漢文など、国語科目に特化した内容
- 「日本史」: 日本史科目に特化した内容
- 「社会」or「社会科」: 世界史・政経・倫理など、日本史以外の社会系科目
- 「勉強法」: 音読・反復・暗記・復習など、科目横断の学習テクニック
- 「計画」: スケジュール・時間管理・受験計画・ロードマップ
- 「受験」: 志望校選び・出願・推薦・入試制度・大学生活など、制度や戦略の話
- 「科目」or「英語・国語・日本史」: 複数科目を横断的に扱う内容
- 「一般」: 上記いずれにも当てはまらない、マインドセット・モチベーション・一般論

出力は必ず次のJSON形式のみ（前置きや説明なし）：
{"results":[{"id":"xxx","category":"英語"},{"id":"yyy","category":"勉強法"}]}`;

async function fetchAllPosts() {
  const all = [];
  let offset = 0;
  while (true) {
    const url = `https://${SERVICE}.microcms.io/api/v1/labs?limit=100&offset=${offset}&fields=id,title,excerpt,category`;
    const r = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': KEY } });
    const data = await r.json();
    all.push(...data.contents);
    if (all.length >= data.totalCount) break;
    offset += 100;
  }
  return all;
}

async function classifyBatch(items) {
  const input = items.map((i) => ({ id: i.id, title: i.title, excerpt: (i.excerpt || '').slice(0, 200) }));
  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4000,
    system: SYSTEM,
    messages: [{ role: 'user', content: `以下の記事を分類してください：\n\n${JSON.stringify(input, null, 2)}` }],
  });
  const text = res.content[0].text.trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('JSON parse failed: ' + text.slice(0, 200));
  const parsed = JSON.parse(jsonMatch[0]);
  return parsed.results;
}

async function updateCategory(id, category) {
  const url = `https://${SERVICE}.microcms.io/api/v1/labs/${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'X-MICROCMS-API-KEY': KEY },
    body: JSON.stringify({ category: [category] }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
}

async function main() {
  console.log(`=== カテゴリ自動振り分け ${DRY ? '(DRY RUN)' : ''} ===`);
  const posts = await fetchAllPosts();
  console.log(`全 ${posts.length} 件を取得\n`);

  const BATCH = 20;
  const classifications = [];
  for (let i = 0; i < posts.length; i += BATCH) {
    const batch = posts.slice(i, i + BATCH);
    process.stdout.write(`[${i + 1}-${Math.min(i + BATCH, posts.length)}/${posts.length}] 分類中... `);
    try {
      const results = await classifyBatch(batch);
      classifications.push(...results);
      console.log(`OK (${results.length}件)`);
    } catch (e) {
      console.log(`FAIL: ${e.message.slice(0, 100)}`);
    }
  }

  console.log(`\n=== 分類結果 ===`);
  const counts = {};
  for (const c of classifications) {
    counts[c.category] = (counts[c.category] || 0) + 1;
  }
  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}件`));

  if (DRY) {
    console.log('\n[DRY RUN] PATCH はスキップ');
    console.log('\n最初の10件のプレビュー：');
    for (let i = 0; i < Math.min(10, classifications.length); i++) {
      const c = classifications[i];
      const p = posts.find((x) => x.id === c.id);
      console.log(`  ${c.category.padEnd(8)} ← ${p?.title?.slice(0, 40)}`);
    }
    return;
  }

  console.log(`\n=== microCMS 更新開始 ===`);
  let ok = 0, fail = 0;
  for (let i = 0; i < classifications.length; i++) {
    const c = classifications[i];
    const p = posts.find((x) => x.id === c.id);
    if (!p) continue;
    if (!CATEGORIES.includes(c.category)) {
      console.log(`[${i + 1}/${classifications.length}] SKIP 不正なカテゴリ: ${c.category}`);
      fail++;
      continue;
    }
    process.stdout.write(`[${i + 1}/${classifications.length}] ${c.category.padEnd(8)} ← ${p.title.slice(0, 30)}... `);
    try {
      await updateCategory(c.id, c.category);
      console.log('OK');
      ok++;
      await new Promise((r) => setTimeout(r, 800));
    } catch (e) {
      console.log(`FAIL: ${e.message.slice(0, 80)}`);
      fail++;
    }
  }
  console.log(`\n=== 完了 ===\n成功: ${ok} / 失敗: ${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
