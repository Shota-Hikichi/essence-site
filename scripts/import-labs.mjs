#!/usr/bin/env node
/**
 * Essence Lab 記事一括インポートスクリプト
 *
 * blog-source.json を読み込み、microCMS の labs エンドポイントに
 * 下書きとして記事をPOSTします。
 *
 * 事前準備:
 *   1. microCMS で labs API を下記スキーマで作成（README参照）
 *   2. microCMS 管理画面 > APIキー > デフォルトキーに「POST（下書き含む）」権限を付与
 *      ※既存キーでOK。もしくは書き込み専用キーを別途発行
 *   3. .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY を設定
 *
 * 実行:
 *   node scripts/import-labs.mjs --limit 5     # 最初の5件だけテストインポート
 *   node scripts/import-labs.mjs               # 全145件インポート
 *   node scripts/import-labs.mjs --publish     # 公開状態でインポート（下書きではなく）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// .env.local を簡易読み込み
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) {
      const key = m[1];
      let val = m[2];
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

// Essence Lab is hosted in a separate microCMS service (`eslab`)
const SERVICE_DOMAIN =
  process.env.MICROCMS_LAB_SERVICE_DOMAIN ||
  process.env.MICROCMS_SERVICE_DOMAIN ||
  'eslab';
const WRITE_API_KEY =
  process.env.MICROCMS_LAB_WRITE_API_KEY ||
  process.env.MICROCMS_WRITE_API_KEY ||
  process.env.MICROCMS_LAB_API_KEY ||
  process.env.MICROCMS_API_KEY;
const SOURCE_PATH = '/Users/kmt/Desktop/essence-coach/scripts/output/blog-source.json';

if (!SERVICE_DOMAIN || !WRITE_API_KEY) {
  console.error('Error: MICROCMS_SERVICE_DOMAIN と MICROCMS_WRITE_API_KEY を .env.local に設定してください。');
  process.exit(1);
}

const args = process.argv.slice(2);
const limitArg = args.find((a) => a.startsWith('--limit'));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1] || args[args.indexOf(limitArg) + 1], 10) : Infinity;
const PUBLISH = args.includes('--publish');

// ----- 本文生成 -----

function generateBody(item) {
  const parts = [];

  // YouTube embed at top (responsive via padding-bottom trick for widely-supported CSS)
  if (item.youtube_id) {
    parts.push(
      `<div style="position:relative;width:100%;padding-bottom:56.25%;margin:0 0 24px;border-radius:12px;overflow:hidden;background:#000;"><iframe src="https://www.youtube.com/embed/${escapeAttr(item.youtube_id)}" title="${escapeAttr(item.title || '')}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe></div>`
    );
  }

  // イントロ: 適用場面
  if (item.applicable_situations) {
    parts.push(
      `<p><strong>この記事が役に立つ方：</strong>${escapeHtml(item.applicable_situations)}</p>`
    );
  }

  // 結論先出し（excerpt を冒頭サマリとして）
  if (item.excerpt) {
    parts.push(
      `<blockquote><p>${escapeHtml(item.excerpt)}</p></blockquote>`
    );
  }

  // key_points を H2 セクションとして展開
  if (Array.isArray(item.key_points) && item.key_points.length > 0) {
    parts.push(`<h2>この記事のポイント</h2>`);
    parts.push('<ol>');
    item.key_points.forEach((p) => {
      parts.push(`<li>${escapeHtml(p)}</li>`);
    });
    parts.push('</ol>');

    // 各ポイントを見出しつきで展開
    item.key_points.forEach((p, i) => {
      const heading = extractHeading(p);
      const detail = extractDetail(p);
      parts.push(`<h3>${i + 1}. ${escapeHtml(heading)}</h3>`);
      parts.push(`<p>${escapeHtml(detail)}</p>`);
    });
  }

  // まとめ
  parts.push(`<h2>まとめ</h2>`);
  parts.push(
    `<p>${escapeHtml(item.excerpt || 'この記事のポイントを振り返り、自身の受験戦略に反映させてみてください。')}</p>`
  );
  parts.push(
    `<p>受験戦略を一人で組み立てるのが難しいと感じたら、<a href="https://www.essence-coaching.net/#cta">Essenceの無料相談</a>でプロのコーチに相談してみてください。志望校と現状の差分を数値化し、あなた専用の逆算ロードマップをご提案します。</p>`
  );

  return parts.join('\n');
}

function escapeAttr(s) {
  return String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function extractHeading(pointText) {
  // 最初の句読点/マーカーまでを見出しとして抽出
  const maxLen = 40;
  const match = pointText.match(/^([^。．、,，\n]{3,40})([。．、,，])/);
  if (match) return match[1];
  return pointText.length > maxLen ? pointText.slice(0, maxLen) + '...' : pointText;
}

function extractDetail(pointText) {
  return pointText;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ----- microCMS POST -----

// Probe an existing article to detect whether `category` is array (multi-select) or string
let categoryIsArray = true; // default to array since microCMS multi-select is common

async function probeSchema() {
  const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/labs?limit=1`;
  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': WRITE_API_KEY },
  });
  if (!res.ok) {
    console.log(`Warning: schema probe failed (${res.status}); assuming category=array`);
    return;
  }
  const data = await res.json();
  if (data.contents && data.contents.length > 0) {
    const sample = data.contents[0];
    if (sample.category !== undefined) {
      categoryIsArray = Array.isArray(sample.category);
    }
    console.log(`Category detected as: ${categoryIsArray ? 'array (multi-select)' : 'string (single-select)'}`);
  }
}

async function postToMicrocms(payload) {
  const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/labs${PUBLISH ? '' : '?status=draft'}`;
  const body = { ...payload };
  if (categoryIsArray && body.category && !Array.isArray(body.category)) {
    body.category = [body.category];
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MICROCMS-API-KEY': WRITE_API_KEY,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} — ${text}`);
  }
  return res.json();
}

async function existsInMicrocms(slug) {
  const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/labs?filters=slug[equals]${encodeURIComponent(slug)}&fields=id&limit=1`;
  const res = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': WRITE_API_KEY },
  });
  if (!res.ok) return false;
  const data = await res.json();
  return Array.isArray(data.contents) && data.contents.length > 0;
}

// ----- main -----

async function main() {
  const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
  const items = source.slice(0, LIMIT);
  console.log(`Importing ${items.length} / ${source.length} articles...`);
  console.log(`Target: https://${SERVICE_DOMAIN}.microcms.io/api/v1/labs`);
  console.log(`Status: ${PUBLISH ? 'published' : 'draft'}\n`);

  await probeSchema();
  console.log('');

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const slug = item.slug || item.id?.slice(0, 8) || `post-${i}`;

    process.stdout.write(`[${i + 1}/${items.length}] ${item.title.slice(0, 40)}... `);

    try {
      if (await existsInMicrocms(slug)) {
        console.log('SKIP (already exists)');
        skipped++;
        continue;
      }

      const payload = {
        title: item.title,
        slug,
        excerpt: (item.excerpt || '').slice(0, 250),
        body: generateBody(item),
        category: item.category?.jp || '一般',
        subcategory: item.subcategory || '',
        youtubeId: item.youtube_id || '',
        seoTitle: item.seo?.title || '',
        seoDescription: item.seo?.description || '',
        seoKeywords: Array.isArray(item.seo?.keywords) ? item.seo.keywords.join(', ') : '',
        affiliateHtml: '',
        publishedDate: item.published_at || item.created_at || new Date().toISOString(),
      };

      await postToMicrocms(payload);
      console.log('OK');
      success++;

      // Rate limit safety: microCMS 無料プランは 60 req/min
      await new Promise((r) => setTimeout(r, 1200));
    } catch (err) {
      console.log(`FAIL (${err.message.slice(0, 100)})`);
      failed++;
    }
  }

  console.log(`\n完了: ${success} 成功 / ${skipped} スキップ / ${failed} 失敗`);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
