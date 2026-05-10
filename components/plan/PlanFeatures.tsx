interface PlanFeaturesProps {
  planType: 'minimum' | 'standard' | 'fullcommit';
}

const featureData = {
  minimum: {
    title: 'ミニマムプランに含まれるサポート',
    gridCols: undefined,
    features: [
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        ),
        title: 'チャットサポート',
        desc: 'Discordを使った質問・相談対応。勉強の疑問や不安を気軽に相談できます。原則24時間以内に返信します。',
        details: ['質問し放題（回数無制限）', '学習相談・メンタルサポート', '参考書の選び方アドバイス'],
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
        ),
        title: '電話相談 週1回（30分/回）',
        desc: '週1回、30分の電話相談で学習状況を確認。進捗に応じた戦略の微調整を行います。',
        details: ['学習進捗の確認', '次月の学習方針策定', 'モチベーション管理'],
      },
      {
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2">
            <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        ),
        title: '学習管理',
        desc: '日々の学習記録をもとに、学習時間と進捗をコーチが把握。適切なタイミングでアドバイスします。',
        details: ['学習ログの記録・可視化', '週次の進捗フィードバック', '学習習慣の定着サポート'],
      },
    ],
  },
  standard: {
    title: 'スタンダードプランに含まれるサポート',
    gridCols: 'repeat(3, 1fr)',
    features: [
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
        title: 'チャットサポート',
        desc: 'Discordで質問し放題。勉強の疑問から参考書の相談まで、いつでも対応します。',
        details: ['質問し放題（回数無制限）', '学習相談・メンタルサポート', '参考書の選び方アドバイス'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
        title: '電話相談 週2回（1時間/回）',
        desc: '週2回、1時間の電話相談を実施。学習進捗の確認と戦略の見直しを丁寧に行います。',
        details: ['学習進捗の詳細確認', '弱点分析と対策立案', '次の2週間の具体的行動計画'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
        title: 'ロードマップ作成',
        desc: '志望校・現在の実力・生活スタイルを考慮した、完全オーダーメイドの学習計画を作成します。',
        details: ['科目別の教材・スケジュール設計', '月別の到達目標設定', '優先順位の明確化', '定期的な計画の見直し'],
        highlighted: true,
        badge: 'このプランの目玉',
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
        title: '小論文添削',
        desc: '月3回まで小論文・志望理由書を添削。構成力・論理力を段階的に引き上げます。',
        details: ['月3回の添削（追加可能）', '具体的な改善ポイント指摘', '合格水準の文章力育成'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>,
        title: '学習管理',
        desc: '日々の学習ログをコーチが確認し、適切なタイミングでフィードバックします。',
        details: ['学習ログの記録・可視化', '週次の進捗フィードバック', '学習習慣の定着サポート'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
        title: 'ワンポイントアドバイス',
        desc: 'ロードマップの各教材に、効果を最大化するための具体的な勉強法をアドバイスします。',
        details: ['教材ごとの最適な使い方', 'あなたの特性に合わせた学習法', '効率的な復習サイクルの提案'],
      },
    ],
  },
  fullcommit: {
    title: 'フルコミットプランに含まれるサポート',
    gridCols: 'repeat(3, 1fr)',
    features: [
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
        title: 'チャットサポート',
        desc: 'Discordで質問し放題。最優先で対応し、原則12時間以内に返信します。',
        details: ['質問し放題（回数無制限）', '最優先レスポンス', '学習相談・メンタルサポート'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
        title: '電話相談（回数・時間無制限）',
        desc: '回数無制限の電話相談で、きめ細かく学習状況を管理。いつでも相談できます。',
        details: ['週次の進捗チェック', '弱点の即時対策', 'メンタルケア・モチベーション管理', '過去問の解き方指導'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
        title: 'ロードマップ作成',
        desc: '科目別・月別の完全オーダーメイド学習計画。毎月の電話相談で見直しを行います。',
        details: ['科目別の教材・スケジュール設計', '月別の到達目標設定', '毎月のロードマップ更新', '効果最大化のワンポイントアドバイス'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
        title: '小論文添削（無制限）',
        desc: '回数無制限で小論文・志望理由書・エッセイを添削。書けば書くほど上達します。',
        details: ['回数無制限の添削', '構成・論理・表現の全面指導', '志望理由書・自己PR対応'],
        highlighted: true,
        badge: 'フルコミット限定',
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>,
        title: '学習管理',
        desc: '日々の学習ログをリアルタイムで把握し、即座にフィードバックします。',
        details: ['学習ログの記録・可視化', 'リアルタイムフィードバック', '学習習慣の最適化'],
      },
      {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A071A" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
        title: '週次進捗レポート',
        desc: '毎週末に詳細な進捗レポートを作成。保護者の方への共有にもお使いいただけます。',
        details: ['科目別の到達度分析', '前週との成長比較', '翌週の戦略提案', '保護者向け共有フォーマット'],
        highlighted: true,
        badge: 'フルコミット限定',
      },
    ],
  },
};

import styles from './plan-responsive.module.css';

export default function PlanFeatures({ planType }: PlanFeaturesProps) {
  const data = featureData[planType];

  return (
    <section className="plan-features-section">
      <div className="container">
        <h2 className="section-title">{data.title}</h2>
        <div
          className={`features-grid ${styles.featuresGrid}`}
        >
          {data.features.map((feature) => (
            <div
              className="feature-card"
              key={feature.title}
              style={
                (feature as { highlighted?: boolean }).highlighted
                  ? { border: '2px solid var(--primary)', position: 'relative' as const }
                  : undefined
              }
            >
              {(feature as { badge?: string }).badge && (
                <div
                  style={{
                    position: 'absolute' as const,
                    top: '-12px',
                    left: '20px',
                    background: 'var(--primary)',
                    color: '#fff',
                    padding: '3px 14px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  {(feature as { badge?: string }).badge}
                </div>
              )}
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <ul className="feature-details">
                {feature.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
