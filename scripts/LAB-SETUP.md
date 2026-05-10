# Essence Lab — セットアップ手順

## Step 1. microCMS で `labs` API を作成

microCMS 管理画面（https://essence-coaching.microcms.io/apis）にログインし、「APIを作成」 → 「自分で決める」 → 「リスト形式」を選択。

### API 基本設定
| 項目 | 値 |
|---|---|
| API名 | Essence Lab |
| エンドポイント | `labs` |
| 型 | リスト形式 |

### スキーマ（フィールド設定）

| フィールドID | 表示名 | 種類 | 設定 |
|---|---|---|---|
| `title` | タイトル | テキストフィールド | 必須 |
| `slug` | スラッグ（URL） | テキストフィールド | 必須・**重複不可にチェック** |
| `excerpt` | 要約 | テキストエリア | 必須・240文字以内推奨 |
| `body` | 本文 | リッチエディタ（v2推奨） | 必須 |
| `category` | カテゴリ | セレクトフィールド | 必須・選択肢は下記参照 |
| `subcategory` | サブカテゴリ | テキストフィールド | 任意 |
| `youtubeId` | YouTube動画ID | テキストフィールド | 任意（例: `dFu-An1ECS0`） |
| `seoTitle` | SEO用タイトル | テキストフィールド | 任意 |
| `seoDescription` | SEO用ディスクリプション | テキストエリア | 任意 |
| `seoKeywords` | SEOキーワード（カンマ区切り） | テキストフィールド | 任意 |
| `affiliateHtml` | アフィリエイト記載 | リッチエディタ | 任意 |
| `publishedDate` | 公開日 | 日時 | 必須 |

### `category` のセレクト選択肢（1行ずつ）
```
一般
英語
勉強法
科目
国語
受験
日本史
計画
社会
社会科
英語・国語・日本史
```

作成完了後、ダミー記事を1件作って公開し動作確認しておくと安心です。

---

## Step 2. 書き込み用 API キーを発行

1. microCMS 管理画面 → 「APIキー」
2. 既存のデフォルトキーの「権限」を確認
3. `labs` に対して **GET / POST（下書き含む）/ PATCH / DELETE** を許可
4. （もしくは別途「ライター用キー」を新規発行）
5. キーの値をコピー

---

## Step 3. 環境変数を設定

### ローカル（`.env.local`）
既に `MICROCMS_API_KEY` が読み取り用として設定されています。書き込み用を別キーにする場合のみ追加：

```
MICROCMS_WRITE_API_KEY=（書き込み権限付きキー）
```

※既存キーに書き込み権限を付けた場合は追加設定不要。

### Vercel（本番用・GET取得のため）
Vercel ダッシュボード → Settings → Environment Variables で `MICROCMS_API_KEY` と `MICROCMS_SERVICE_DOMAIN` が既に設定済み。追加作業は不要。

---

## Step 4. 一括インポート実行

```bash
cd /Users/kmt/Desktop/essence-site

# まず5件だけテストインポート（下書き状態）
node scripts/import-labs.mjs --limit 5

# microCMS 管理画面で下書き記事を確認 → 問題なければ残り全件
node scripts/import-labs.mjs

# 公開状態でいきなり入れたい場合
node scripts/import-labs.mjs --publish
```

全145件のインポートは レート制限考慮で約 **3分** かかります。

---

## Step 5. デプロイ

```bash
npx vercel --prod --yes
```

ISR により、デプロイ後5〜60分以内に本番サイトへ自動反映されます。

---

## 運用フロー

### 新規記事を書く
1. microCMS 管理画面 → `labs` → 「新規作成」
2. 必要項目を入力 → 「公開」
3. 最大10分で `https://www.essence-coaching.net/lab/<slug>` に反映

### 既存記事を修正する
1. microCMS で該当記事を編集 → 「更新」
2. ISR により最大1時間で反映（緊急時は Vercel でデプロイ）

### アフィリエイトリンクの入れ方
`affiliateHtml` フィールドにリッチエディタで以下のようなHTMLを入力：
```html
<ul>
  <li><a href="https://amzn.to/xxxx" target="_blank" rel="nofollow sponsored">ポラリス英語長文2（Amazon）</a></li>
  <li><a href="https://rcm.r10.to/xxxx" target="_blank" rel="nofollow sponsored">シス単5訂版（楽天ブックス）</a></li>
</ul>
```

`rel="nofollow sponsored"` を必ず付けてください（Googleガイドライン遵守）。

---

## 生成される記事の本文フォーマット

import-labs.mjs は各記事を以下の構造で自動生成します：

```
この記事が役に立つ方: ...（applicable_situations）

> 要約ブロック（excerpt）

## この記事のポイント
1. key_point 1
2. key_point 2
...

### 1. key_point 1 の見出し
key_point 1 の詳細

### 2. key_point 2 の見出し
...

## 動画で詳しく解説
（YouTube埋め込みへの誘導）

## まとめ
...
無料相談への誘導テキスト
```

**生成後にmicroCMSで1記事ずつ編集**して、より自然な文章にブラッシュアップ・SEOチューニングしていくのがおすすめの運用です（特に月間アクセス上位になりそうな記事から優先的に）。

---

## トラブルシューティング

### インポート時に 401 エラー
→ APIキーの権限を確認。`labs` に POST 権限があるか。

### インポート時に 400 エラー + "value is not allowed"
→ カテゴリーのセレクト選択肢とsource側の値が一致していない。`labs` APIのcategoryセレクト値を確認。

### インポート時に 429 エラー
→ レート制限。script内の `setTimeout(1200)` を `2000` に増やして再実行。

### 本番に記事が表示されない
→ ISR キャッシュ待ち。`vercel --prod --yes` で手動再デプロイで即時反映。
