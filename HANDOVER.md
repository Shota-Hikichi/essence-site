# Essence サイト 引き継ぎドキュメント

最終更新: 2026-05-13

別PC・別セッションで作業を継続する人向けの実務ガイド。読めば即作業開始できる状態を目指す。

---

## 1. プロジェクト概要

- **サイト名**: Essence（大学受験オンラインコーチング）
- **本番URL**: https://www.essence-coaching.net
- **派生プロダクト**: Delto（学習ダッシュボード） https://delto.essence-coaching.net
- **メディア**: Essence Lab（記事120本以上） https://www.essence-coaching.net/lab

## 2. リポジトリ・デプロイ

- **GitHub**: https://github.com/Shota-Hikichi/essence-site
- **デプロイ先**: Vercel（プロジェクト名 `essence-site`、teamは `infobaysherwoods-projects`）
- **ローカルパス**: `/Users/kmt/Desktop/essence-site/`
- **デプロイコマンド**: `npx vercel --prod --yes`
  - GitHub連携で自動デプロイされるが、即時反映したい場合は手動コマンドが確実

## 3. 技術スタック

| 領域 | 採用技術 |
|---|---|
| フレームワーク | Next.js 16（App Router）※ 通常のNext.jsと挙動が違うので注意（`app/AGENTS.md` 参照） |
| UI | インラインstyle + CSS Modules（部分的）。Tailwind不使用 |
| 言語 | TypeScript |
| CMS | microCMS（2サービス：`essence-coaching` for News, `eslab` for Essence Lab） |
| 決済 | Stripe（Subscription、API 2025-03-31+） |
| メール | Resend |
| 残枠管理 | Vercel KV（Redis、ioredis経由） |
| 記事自動生成 | Anthropic Claude API（`@anthropic-ai/sdk`） |
| ホスティング | Vercel |
| ドメイン | お名前.com or similar（Vercelに接続済） |

> **重要**: このプロジェクトは **Next.js 16** を使用しており、訓練データのNext.js知識と挙動が異なる。新機能を実装する前に `app/AGENTS.md` のreminder（"This is NOT the Next.js you know"）を確認すること。

## 4. 環境変数（.env.local）

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Vercel KV (Redis) — 残枠管理
REDIS_URL=redis://...

# Resend — メール送信
RESEND_API_KEY=re_...

# microCMS（メインサービス：お知らせ用）
MICROCMS_SERVICE_DOMAIN=essence-coaching
MICROCMS_API_KEY=...
MICROCMS_WRITE_API_KEY=...

# microCMS（Essence Lab用 別サービス）
MICROCMS_LAB_SERVICE_DOMAIN=eslab
MICROCMS_LAB_API_KEY=...

# Anthropic Claude API — Lab記事自動生成スクリプト用
ANTHROPIC_API_KEY=sk-ant-...

# 管理者
ADMIN_SECRET_KEY=essence-admin-2024  # /api/slots POST 認証用
```

Vercelにも同じ値を設定済み（Project Settings → Environment Variables）。

## 5. ディレクトリ構成

```
app/
├── page.tsx                  # ホームページ（コンポーネントを並べるだけ）
├── layout.tsx                # ルートレイアウト
├── globals.css               # グローバルCSS
├── opengraph-image.tsx       # 動的OG画像
├── sitemap.ts                # サイトマップ動的生成
├── robots.ts                 # robots.txt
├── checkout/                 # 決済ページ（Stripe Elements）
├── contact/                  # 問い合わせフォーム
├── lab/                      # Essence Lab（記事一覧・詳細・カテゴリ）
├── news/                     # お知らせ
├── plan/                     # 各プラン詳細（minimum/standard/fullcommit）
├── tokushoho/                # 特定商取引法
├── admin/                    # 残枠管理画面
└── api/
    ├── checkout/             # Stripe Subscription作成
    ├── checkout/confirm/     # 決済完了→確認メール送信
    ├── slots/                # 残枠GET/POST（Redis）
    └── contact/              # 問い合わせメール送信

components/                   # 主要セクション。HeroBg_*.tsxは試行錯誤の残骸
├── Hero.tsx                  # ヒーローセクション
├── HeroSlots.tsx             # ヒーロー下の簡易残枠バー
├── ThinkingProcess.tsx, Philosophy.tsx, Services.tsx, ...
├── Delto.tsx                 # Delto紹介セクション（モバイル筐体内に実画面再現）
├── FAQ.tsx                   # FAQ + JSON-LD（FAQPage）
├── CtaSection.tsx            # 残枠表示付きCTA
└── ...

lib/
└── microcms.ts               # microCMSクライアント・型・カテゴリ定義

scripts/
├── generate-labs.mjs         # Claudeで145記事を一括生成（実行済み、120本生成）
├── recategorize-labs.mjs     # 記事のカテゴリ自動振り分け（実行済み）
└── import-labs.mjs           # 旧テンプレートベースのインポート（参考）
```

## 6. ホームページのセクション順（app/page.tsx）

```
Hero → HeroSlots → ThinkingProcess → Philosophy → Stats →
Services → Delto → ReportSample → Approach → Flow → Profile →
Testimonials → PricingCompare → Plans → CtaSection → FAQ →
News → ContactForm → FloatingCta
```

## 7. 主要機能の仕組み

### 7.1 決済フロー（Stripe Subscription）

- **/checkout** ページで顧客情報入力（名前・メール・電話番号、すべて必須）
- `/api/checkout/route.ts` で Stripe Subscription を作成
- Price は `lookup_key` で初回作成 → 以降再利用（`essence_<plan>_30day_v1`）
- 課金サイクル: `interval: day, interval_count: 31` = **決済日の翌日から起算して30日後**
- フロントは `latest_invoice.confirmation_secret` から client_secret を受け取り PaymentElement 表示
- 旧API（`latest_invoice.payment_intent`）にもフォールバック対応済み
- 決済成功時に Resend で確認メール送信（顧客 + 管理者宛て）

### 7.2 残枠管理

- **Redis（Vercel KV）** に `essence:slots` というキーで `{minimum, standard, fullcommit}` を保存
- 表示: ヒーロー直下 `HeroSlots.tsx` + CTA内 `CtaSection.tsx`
- 更新方法:
  - **管理画面**: `/admin` で UI から更新
  - **CLI**: `curl -X POST .../api/slots -H "Authorization: Bearer essence-admin-2024" -d '{"minimum":1,"standard":0,"fullcommit":0}'`
- 現在値（2026-05-13）: `minimum:1, standard:0, fullcommit:0`
- 0の枠は「要相談」と表示

### 7.3 Essence Lab（記事メディア）

- **microCMS別サービス（eslab）** で管理。120本の記事が下書き状態で投入済み
- カテゴリ分類は `recategorize-labs.mjs` で実行済み（勉強法35 / 受験23 / 英語18 / 計画16 / 一般15 / 国語4 / 英語・国語・日本史3 / 日本史3 / 社会2 / 科目1）
- 一覧ページではサムネイル非表示（カテゴリタグ + 日付 + タイトル + 抜粋のみ）
- 記事末にYouTube動画埋め込み（`post.youtubeId` から iframe レンダリング、microCMSのリッチエディタが iframe を剥がす対策）
- 残り未生成の記事は約25本。`node scripts/generate-labs.mjs` で続きから再開可能

### 7.4 Delto セクション

- ホームページに iPhoneモックアップ内で実際のDelto画面を再現
- モバイルでは 260px幅、PCでは 320px幅にレスポンシブ
- タイトル: 「一目で自分がどこにいて、何をしたらいいかがわかるダッシュボード」
- CTAボタンなし（紹介のみ）

### 7.5 FAQ

- カテゴリ別タブUI + JSON-LD（FAQPage）でSEO対応
- 改行を効かせるため `whiteSpace: 'pre-line'`

## 8. 過去の主要な作業履歴（このセッション）

直近の作業をコミットログ・記憶ベースで整理：

1. **特商法ページ整理**: 銀行振込先セクションを削除（法的に必須ではないため）
2. **残枠表示の改善**: ヒーロー直下に `HeroSlots.tsx` 追加、要相談プランへの注記追加
3. **Stripe Subscription化**: 一回払い → 自動更新（決済日の翌日起算30日後 = 31日サイクル）
4. **決済フォームの拡張**: 名前・電話番号を必須化（Stripe Customer に保存）
5. **チェックアウト言語化**: Stripe Elements を `locale: 'ja'` で日本語化
6. **Delto セクション追加**: iPhoneモックアップ内に実画面再現
7. **Essence Lab 構築**: microCMSセットアップ + Claude APIで120本記事生成 + カテゴリ自動振り分け
8. **FAQ更新**: 科目解説についてチーム体制（在学生・OB協力）と早慶は引地本人確認

## 9. 既知の TODO / 未完了タスク

- [ ] Essence Lab の残り25本程度の記事生成（`node scripts/generate-labs.mjs` で再開）
- [ ] Essence Lab 記事のアフィリエイトリンク貼付（A8.net・もしも等で審査通過後）
- [ ] Essence Lab 記事を下書き → 公開状態へ一括変更
- [ ] Amazonアソシエイト導入時はフッターに「当サイトは…」表記が必要
- [ ] Search Console / GA4 のデータ確認・改善
- [ ] スタンダード／フルコミット枠の9月開放タイミングが近づいたら表記更新

## 10. 別PCで作業を始めるときの手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/Shota-Hikichi/essence-site.git
cd essence-site

# 2. 依存インストール
npm install

# 3. .env.local を作成（上の環境変数を全部設定）
cp .env.local.example .env.local  # ※ exampleは存在しないので手動で作る
# 値は 1Password など共有された場所から取得

# 4. ローカル起動
npm run dev
# → http://localhost:3000

# 5. デプロイ前に必ず
npx tsc --noEmit       # 型チェック
npm run lint           # （設定済みなら）

# 6. デプロイ
git add .
git commit -m "..."
git push                # GitHub経由で自動デプロイ
# または即時
npx vercel --prod --yes
```

## 11. 注意事項・落とし穴

### 11.1 Next.js 16 特有
- App Router の挙動が標準と異なる場合あり。`app/AGENTS.md` を必ず確認
- `params` は Promise になっている（`const { slug } = await params;`）
- ISR の `revalidate` は秒数指定

### 11.2 microCMS
- リッチエディタは **iframe タグを剥がす** ので、YouTube埋め込みは `youtubeId` フィールドからフロントで生成する
- 公開ステータス: 下書きは `?status=draft` クエリで POST。本番では指定しない
- 1リクエストの limit は **最大100**。pagination 必須

### 11.3 Stripe API
- v22+ では Subscription の client_secret は `latest_invoice.confirmation_secret.client_secret` から取得（旧API: `payment_intent.client_secret`）
- 両対応のコードになっている（`app/api/checkout/route.ts` 参照）

### 11.4 Vercel KV
- スリープしない設計（毎回 `new Redis() → disconnect()`）
- 残枠 0 / 0 / 0 の状態は本番でテスト可能

### 11.5 残骸ファイル
- `components/HeroBg_*.tsx` は試行錯誤の遺物。実際に使われているのは `HeroBackground.tsx` のみ
- 必要なら整理可能

## 12. 連絡先・関連リソース

- **Stripeダッシュボード**: https://dashboard.stripe.com
- **Vercelダッシュボード**: https://vercel.com/infobaysherwoods-projects/essence-site
- **microCMS（メイン）**: https://essence-coaching.microcms.io
- **microCMS（Lab）**: https://eslab.microcms.io
- **Resend**: https://resend.com
- **管理者宛て通知**: `frisk0709@gmail.com`（決済完了時など）

---

困ったら：このドキュメントを更新して次の作業者へバトンを渡してください。
