'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

const categories: FAQCategory[] = [
  {
    id: 'service',
    label: 'サービスについて',
    items: [
      {
        q: 'Essenceは他の塾・予備校と何が違うのですか？',
        a: 'Essenceは「知識を教える」ことではなく、「自分で考え、自分で改善し続ける力」を育てることに特化したオンライン受験コーチングです。志望校と現状の差分を科目・分野ごとに定量化し、残された時間から逆算して、今日やるべきタスクを優先度つきで明確化します。',
      },
      {
        q: 'オンラインだけで完結しますか？',
        a: 'はい、すべてのコーチングはオンラインで完結します。全国どこからでもご受講いただけます。Zoomでの面談、チャットでの日次サポート、専用レポートによる可視化を組み合わせて進行します。',
      },
      {
        q: '科目の授業や解説はしてもらえますか？',
        a: 'はい、ご希望に応じて科目・単元の解説は手厚く行います。Essenceでは、志望大学に応じて必要なフィードバックを、その大学に在学する学生やOB・OGを絡めたチーム体制でレビューした上でお返しする仕組みを取っています。志望校の出題傾向や合格者の感覚に即した、解像度の高い解説をお届けできるのが特徴です。\n\nなお、早慶レベルの志望校については、代表の引地本人が内容を確認した上でお返しする運用としています。\n\nただし、Essenceの本来の目的は授業を行う塾ではなく、あなた自身が「何を・どの順で・どう進めるか」を設計し、自走できるようになるための学習コーチングです。解説は必要に応じて柔軟に提供しつつ、軸はあくまで戦略設計・進捗管理・軌道修正に置いています。',
      },
      {
        q: '対象学年・対象校はありますか？',
        a: '高校1年生〜高卒生（浪人生）まで、大学受験を目指すすべての方が対象です。国公立・私立を問わず、難関大学から中堅大学まで志望校に応じた個別設計を行います。',
      },
    ],
  },
  {
    id: 'plan',
    label: 'プラン・料金について',
    items: [
      {
        q: 'プランの違いを教えてください。',
        a: 'ミニマム（週1回30分・セルフ進行向け）、スタンダード（週2回1時間＋月次レポート・最も人気）、フルコミット（無制限面談＋週次レポート・難関校志望向け）の3プランをご用意しています。お試しで一度無料相談を受けていただくのがおすすめです。',
      },
      {
        q: '途中でプランを変更できますか？',
        a: 'はい、月単位でプラン変更が可能です。学習状況や受験期の進行に応じて、アップグレード・ダウングレードいただけます。お問い合わせフォームまたは担当コーチに直接ご相談ください。',
      },
      {
        q: '支払い方法は何がありますか？',
        a: 'クレジットカード（Visa / Mastercard / American Express / JCB）による月額自動決済に対応しています。決済はStripeを通じて安全に処理されます。',
      },
    ],
  },
  {
    id: 'support',
    label: '相談・サポートについて',
    items: [
      {
        q: '無料相談では何をしますか？',
        a: '15分のオンライン面談で、現状の学習状況・志望校・お悩みをヒアリングし、Essenceが合うかどうかを一緒に確認します。勧誘は一切行いません。志望校合格に向けた具体的な方向性をお持ち帰りいただけます。',
      },
      {
        q: '保護者も同席できますか？',
        a: 'もちろん可能です。無料相談・定例面談ともに、保護者の方のご同席を歓迎しています。ご家庭での学習環境づくりについてもアドバイスさせていただきます。',
      },
      {
        q: 'コーチングの効果が出るまでどのくらいかかりますか？',
        a: '個人差はありますが、多くの受講生が開始から1〜2ヶ月で「勉強の進め方が明確になった」と実感されます。模試等の成績への反映には3〜6ヶ月程度を目安にしてください。',
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('service');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  // JSON-LD: FAQPage — include ALL categories' items for SEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      }))
    ),
  };

  return (
    <section
      className="faq-section"
      id="faq"
      style={{
        padding: '100px 0',
        background: '#FAFAF7',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-label" style={{ color: 'var(--primary)' }}>FAQ</p>
          <h2
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '28px',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            よくあるご質問
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>
            カテゴリーを選択してご覧ください
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="faq-tabs animate-on-scroll"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '36px',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`faq-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 600,
                background: activeCategory === cat.id ? 'var(--primary)' : '#fff',
                color: activeCategory === cat.id ? '#fff' : '#4B5563',
                border: `1px solid ${activeCategory === cat.id ? 'var(--primary)' : '#E5E7EB'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.5px',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="faq-list animate-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentCategory.items.map((item, i) => {
            const key = `${activeCategory}-${i}`;
            const isOpen = !!openItems[key];
            return (
              <div
                key={key}
                style={{
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s ease',
                  boxShadow: isOpen ? '0 4px 16px rgba(154, 7, 26, 0.06)' : 'none',
                }}
              >
                <button
                  onClick={() => toggleItem(key)}
                  aria-expanded={isOpen}
                  className="faq-question"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '20px 24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        lineHeight: 1.2,
                        flexShrink: 0,
                      }}
                    >
                      Q
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#2D2D3A', lineHeight: 1.7 }}>
                      {item.q}
                    </span>
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.25s ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      color: 'var(--primary)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease, opacity 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#C9A84C',
                        lineHeight: 1.2,
                        flexShrink: 0,
                      }}
                    >
                      A
                    </span>
                    <p style={{ fontSize: '14px', lineHeight: 2.0, color: '#4B5563', whiteSpace: 'pre-line' }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .faq-tab:not(.is-active):hover {
          border-color: var(--primary) !important;
          color: var(--primary) !important;
        }
        .faq-tab.is-active,
        .faq-tab.is-active:hover,
        .faq-tab.is-active:focus {
          background: var(--primary) !important;
          color: #fff !important;
          border-color: var(--primary) !important;
        }
        .faq-question:hover {
          background: #FAFAF7;
        }
        @media (max-width: 1023px) {
          .faq-section {
            padding: 70px 0 !important;
          }
          .faq-tabs {
            gap: 6px !important;
          }
          .faq-tab {
            padding: 10px 16px !important;
            font-size: 12px !important;
          }
          .faq-question {
            padding: 16px 18px !important;
          }
          .faq-question span[style*="font-size: 15px"] {
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
