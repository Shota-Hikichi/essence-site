#!/usr/bin/env node
/**
 * Essence Lab 記事生成スクリプト（Claude API版）
 *
 * blog-source.json の 145記事を、Hikky本人の語り口で Claude に生成させ、
 * microCMS の labs エンドポイントに下書き状態でPOSTします。
 *
 * 事前準備:
 *   .env.local に以下を追加:
 *     ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxx
 *     MICROCMS_LAB_SERVICE_DOMAIN=eslab
 *     MICROCMS_LAB_API_KEY=wpm0oc9o9oiYIPwdyKAK26rDbR5CnFA7kvAH
 *
 * 実行:
 *   node scripts/generate-labs.mjs --limit 3         # 3件テスト生成
 *   node scripts/generate-labs.mjs                   # 全145件
 *   node scripts/generate-labs.mjs --publish         # 公開状態で生成
 *   node scripts/generate-labs.mjs --start 50        # 50番目から再開
 *
 * macOSでスリープ防止:
 *   caffeinate -i node scripts/generate-labs.mjs
 *
 * 推定時間: 1記事あたり約15〜25秒 → 145記事で約45〜60分
 * 推定コスト: Claude Sonnet 4.5 で 1記事あたり約$0.03 → 全体で$4〜5
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local
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

const SERVICE_DOMAIN = process.env.MICROCMS_LAB_SERVICE_DOMAIN || 'eslab';
const WRITE_API_KEY = process.env.MICROCMS_LAB_API_KEY || process.env.MICROCMS_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SOURCE_PATH = '/Users/kmt/Desktop/essence-coach/scripts/output/blog-source.json';

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY is missing. Add to .env.local');
  process.exit(1);
}
if (!WRITE_API_KEY) {
  console.error('MICROCMS_LAB_API_KEY is missing. Add to .env.local');
  process.exit(1);
}

const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(name);
  if (idx >= 0 && args[idx + 1]) return args[idx + 1];
  return null;
};
const LIMIT = parseInt(getArg('--limit') || 'Infinity', 10);
const START = parseInt(getArg('--start') || '0', 10);
const PUBLISH = args.includes('--publish');

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ========== Style reference article (the approved sample) ==========
const STYLE_REFERENCE = `
# スタイルリファレンス記事（この品質・トーンで書く）

## タイトル
早稲田に受かる人と落ちる人の決定的な違い｜時間でも地頭でもない、本当の分岐点

## 本文の冒頭例
<p>こんにちは、Essenceの引地（Hikky）です。</p>
<p>今日は、ずっと1本の動画に凝縮して言いたかったけどなかなか言語化できなかったテーマを、ようやく整理できたのでお話しします。</p>
<p>テーマは、<strong>「早稲田に2浪3浪しても落ちる人と、数ヶ月で受かる人の違い」</strong>です。</p>
<p>オンラインサロンを始めてから、毎日200件以上の相談に返信してきました...</p>

<blockquote><p><strong>この記事を読んでほしい人</strong><br>・難関大を目指しているけど、成績がなかなか伸びない人<br>...</p></blockquote>

<h2>1. 「早稲田は4ヶ月で受かりますか？」という質問は、もう間違っている</h2>
<p>最初に、よく来る質問から。</p>
...

## 文体の特徴
- 一人称は「僕」
- 口語的でカジュアル（〜ですよね、〜（笑）、ぶっちゃけ、マジで、など）
- 「結論から言うと」「〜んですよね」といった話し口
- 断定的な主張＋その根拠のセット
- 比喩を多用（Lサイズトレーナー、マラソンvs100m など）
- 強調は <strong>タグ</strong>
- 大事な思想は <blockquote> で引用ブロック
- リストは <ul> / <ol>
- 見出しは <h2>（章）と <h3>（サブ節）を使い分ける

## 文章の構造
1. 挨拶（こんにちは、Essenceの引地（Hikky）です。）
2. 今日のテーマ紹介（動画で語った内容を記事化した旨）
3. 「この記事を読んでほしい人」blockquote
4. 本編（H2セクション複数、各セクションにH3サブ節も）
5. まとめ（<ul>で要点リスト化）
6. 「動画でも詳しく話しています」セクション（H2見出し + 1段落 + YouTube iframe 埋め込み）
7. 「それでも自分一人では設計しきれないと感じたら」セクション：Essence無料相談への自然な誘導
`;

const YOUTUBE_EMBED_TEMPLATE = (videoId, title) =>
  `<div style="position:relative;width:100%;padding-bottom:56.25%;margin:0 0 20px;border-radius:12px;overflow:hidden;background:#000;"><iframe src="https://www.youtube.com/embed/${videoId}" title="${String(title).replace(/"/g, '&quot;')}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe></div>`;

const CTA_SECTION = `<h2>それでも「自分一人では設計しきれない」と感じたら</h2>
<p>Essenceでは、志望校と現在地の差分を科目・分野ごとに数値化して、残された時間から逆算して<strong>あなた専用の逆算ロードマップ</strong>を設計するオンライン受験コーチングを提供しています。第一志望合格率は76%。</p>
<p><a href="https://www.essence-coaching.net/#cta"><strong>15分の無料相談を予約する</strong></a>（勧誘は一切いたしません）</p>`;

// ========== Claude call ==========

async function generateArticleBody(item) {
  const systemPrompt = `あなたは「Essence」という大学受験オンラインコーチングの代表・引地祥太（Hikky）本人の文体で、受験生向けのブログ記事を執筆するライターです。下記のスタイルリファレンスに忠実に従い、読者を惹きつけるリッチで充実した記事本文を書いてください。

${STYLE_REFERENCE}

## 厳守事項
- 出力は **HTML** のみ。<p>, <h2>, <h3>, <ul>, <ol>, <li>, <strong>, <blockquote>, <br>のタグを使用
- <h1>は使わない（タイトルは別フィールドで管理）
- 最初の段落は必ず「こんにちは、Essenceの引地（Hikky）です。」から始める
- 「この記事を読んでほしい人」を blockquote で早い段階に配置
- 本編は <h2> 3〜5つで章立て、必要に応じて <h3> サブ節
- 重要な主張・言葉は <strong> で強調
- 要点まとめは最後に <ul> でリスト化
- 末尾に以下2つのセクションを必ず含める（改変しない）：
  1. 「動画でも詳しく話しています」（H2）→ 1段落のリード文 → {{YOUTUBE_EMBED}} プレースホルダー
  2. 「それでも「自分一人では設計しきれない」と感じたら」（H2）→ Essenceの紹介 → 無料相談CTA
- 回答は **HTMLのみ**。前置き・解説・マークダウンコードブロックは不要
- 全体で2500〜4000文字程度
- 動画を書き起こしたYouTube音声の癖（「え」「まあ」「〜みたいな」の連発）は整理し、論理的で読みやすく整える
- 元の動画にない情報は捏造しない。key_points と transcript に基づいて書く`;

  const userPrompt = `以下の動画情報を元に、Hikky本人の文体でブログ記事本文（HTML）を書いてください。

## タイトル
${item.title}

## カテゴリ
${item.category?.jp || '一般'} / ${item.subcategory || ''}

## 記事が役立つ対象
${item.applicable_situations || ''}

## 要約（excerpt）
${item.excerpt || ''}

## 要点（この骨格に沿って本文を構築）
${(item.key_points || []).map((p, i) => `${i + 1}. ${p}`).join('\n')}

## 元動画の書き起こし（noisy・参考用）
${(item.full_transcript || '').slice(0, 6000)}

---

HTMLのみで本文を出力してください（\`\`\`html ... \`\`\` も不要、直接HTML）。末尾の {{YOUTUBE_EMBED}} プレースホルダーは後でこちらで埋め込みに置換します。`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = response.content.find((b) => b.type === 'text')?.text || '';
  // Strip possible code fence
  return text
    .replace(/^```html?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}

// ========== microCMS ==========

async function existsInMicrocms(slug) {
  const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/labs?filters=slug[equals]${encodeURIComponent(slug)}&fields=id&limit=1`;
  const res = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': WRITE_API_KEY } });
  if (!res.ok) return false;
  const data = await res.json();
  return Array.isArray(data.contents) && data.contents.length > 0;
}

async function postToMicrocms(payload) {
  const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/labs${PUBLISH ? '' : '?status=draft'}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MICROCMS-API-KEY': WRITE_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }
  return res.json();
}

// ========== main ==========

async function main() {
  const source = JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf8'));
  const items = source.slice(START, Number.isFinite(LIMIT) ? START + LIMIT : undefined);

  console.log(`=== Essence Lab 記事生成 ===`);
  console.log(`対象: ${items.length} 件（${START}番目から${Number.isFinite(LIMIT) ? `${LIMIT}件` : '全件'}）`);
  console.log(`Service: ${SERVICE_DOMAIN}.microcms.io`);
  console.log(`Status: ${PUBLISH ? '公開' : '下書き'}`);
  console.log(`Model: claude-sonnet-4-5`);
  console.log('');

  let success = 0, skipped = 0, failed = 0;
  const startedAt = Date.now();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const slug = item.slug || item.id?.slice(0, 8) || `post-${i}`;
    const absoluteIndex = START + i + 1;

    const prefix = `[${absoluteIndex}/${START + items.length}]`;
    process.stdout.write(`${prefix} ${(item.title || '').slice(0, 36).padEnd(36)} ... `);

    try {
      if (await existsInMicrocms(slug)) {
        console.log('SKIP');
        skipped++;
        continue;
      }

      // Generate body via Claude
      let body = await generateArticleBody(item);

      // Replace YouTube placeholder with actual embed
      if (item.youtube_id) {
        body = body.replace('{{YOUTUBE_EMBED}}', YOUTUBE_EMBED_TEMPLATE(item.youtube_id, item.title));
      } else {
        body = body.replace('{{YOUTUBE_EMBED}}', '');
      }

      // If Claude didn't include the CTA (shouldn't happen, but safety), append it
      if (!body.includes('設計しきれない')) {
        body = body + '\n' + CTA_SECTION;
      }

      const payload = {
        title: item.title,
        slug,
        excerpt: (item.excerpt || '').slice(0, 250),
        body,
        category: [item.category?.jp || '一般'],
        subcategory: item.subcategory || '',
        youtubeId: item.youtube_id || '',
        seoTitle: item.seo?.title || `${item.title} | Essence Lab`,
        seoDescription: (item.seo?.description || item.excerpt || '').slice(0, 160),
        seoKeywords: Array.isArray(item.seo?.keywords) ? item.seo.keywords.join(', ') : '',
        publishedDate: item.published_at || item.created_at || new Date().toISOString(),
      };

      await postToMicrocms(payload);
      const elapsed = Math.round((Date.now() - startedAt) / 1000);
      const avgSec = Math.round(elapsed / (i + 1));
      const eta = Math.round((items.length - i - 1) * avgSec / 60);
      console.log(`OK (${Math.round(body.length / 100) / 10}KB, avg ${avgSec}s/記事, 残り${eta}分)`);
      success++;

      // Rate limit safety (microCMS: 60 req/min, Anthropic: flexible)
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.log(`FAIL: ${String(err.message).slice(0, 120)}`);
      failed++;
      // On error, wait a bit longer in case it's rate limiting
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  const totalMin = Math.round((Date.now() - startedAt) / 1000 / 60);
  console.log('');
  console.log(`=== 完了 ===`);
  console.log(`成功: ${success} / スキップ: ${skipped} / 失敗: ${failed}`);
  console.log(`所要時間: ${totalMin} 分`);
  if (failed > 0) {
    console.log(`失敗した記事は再実行すると自動スキップ → 未生成のみ再生成されます`);
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
