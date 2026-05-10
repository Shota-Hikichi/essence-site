export default function Delto() {
  return (
    <section
      id="delto"
      className="animate-on-scroll"
      style={{
        padding: '100px 0',
        background: '#fff',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label">Delto by Essence</p>
        <h2 className="section-title delto-title">
          一目で自分がどこにいて、<br className="mobile-br" />何をしたらいいかがわかるダッシュボード
        </h2>
        <p className="section-subtitle" style={{ margin: '0 auto 48px', maxWidth: '720px' }}>
          Delto（デルト）は、いまの自分と合格との差を <strong style={{ color: 'var(--primary)' }}>km</strong> で可視化する学習ダッシュボードです。
          模試・教材・学習の質から逆算した距離が、今日の一手で縮まっていく体験を提供します。
        </p>

        {/* Phone bezel with faithful Delto dashboard recreation */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 56px' }}>
          <div
            className="delto-bezel"
            style={{
              width: '320px',
              background: '#1a1a1a',
              borderRadius: '44px',
              padding: '14px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10)',
            }}
          >
            <div
              className="delto-screen"
              style={{
                background: '#F5F5F0',
                borderRadius: '32px',
                overflow: 'hidden',
                height: '640px',
                overflowY: 'auto',
                padding: '16px 12px',
                textAlign: 'left',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {/* Card 1: 受験本番まで */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '14px 16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>受験本番まで</span>
                  <span style={{ fontSize: '10px', color: '#9CA3AF' }}>2027-02-14</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 700, color: '#2D2D3A', lineHeight: 1 }}>290</span>
                  <span style={{ fontSize: '13px', color: '#2D2D3A' }}>日</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>(9ヶ月)</span>
                </div>
                <div style={{ height: '3px', background: '#E5E7EB', borderRadius: '999px', marginBottom: '6px' }}>
                  <div style={{ width: '0%', height: '100%', background: '#9A071A', borderRadius: '999px' }} />
                </div>
                <span style={{ fontSize: '10px', color: '#9CA3AF' }}>準備期間 0% 経過</span>
              </div>

              {/* Card 2: 合格までの道のり */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '14px 16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>合格までの道のり</span>
                  <span style={{ fontSize: '10px', color: '#9CA3AF' }}>1/11</span>
                </div>
                <p style={{ fontSize: '12px', color: '#2D2D3A', marginBottom: '12px', lineHeight: 1.5 }}>
                  1 / 12 達成 ・ 「英語基礎完成」を進行中
                </p>

                {/* Distance box */}
                <div style={{ background: '#FAFAF7', borderRadius: '10px', padding: '12px 14px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <span style={{ fontSize: '10px', color: '#6B7280' }}>志望校までの距離</span>
                    <span style={{ fontSize: '9px', color: '#9CA3AF' }}>合格まで（総合判定）</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '32px', fontWeight: 700, color: '#9A071A', lineHeight: 1 }}>536</span>
                      <span style={{ fontSize: '12px', color: '#9A071A', marginLeft: '2px' }}>km</span>
                    </div>
                    <span style={{ fontSize: '9px', color: '#9CA3AF' }}>進んだ距離 464km / 全行程 1000km</span>
                  </div>
                  <div style={{ height: '5px', background: '#F3D6D9', borderRadius: '999px', marginBottom: '12px' }}>
                    <div style={{ width: '46.4%', height: '100%', background: '#9A071A', borderRadius: '999px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: '4px' }}>
                    {[
                      { label: '偏差値到達', val: '78%' },
                      { label: '教材消化', val: '15%' },
                      { label: '時間消費', val: '0%' },
                    ].map((m) => (
                      <div key={m.label}>
                        <div style={{ fontSize: '9px', color: '#9CA3AF', marginBottom: '2px' }}>{m.label}</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D3A' }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '9px', color: '#9CA3AF', marginBottom: '10px' }}>
                  → 左右にスクロールして全マイルストーンを確認できます
                </p>

                {/* Timeline */}
                <div style={{ position: 'relative', overflowX: 'auto', paddingBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0', minWidth: '380px', position: 'relative', padding: '20px 0 24px' }}>
                    {/* line */}
                    <div style={{ position: 'absolute', left: '12px', right: '12px', top: '50%', height: '2px', background: '#E5E7EB', zIndex: 0 }}>
                      <div style={{ width: '20%', height: '100%', background: '#9A071A' }} />
                    </div>
                    {[
                      { month: '4月', label: 'スタート', state: 'done' },
                      { month: '6月', label: '英語基礎完成', state: 'current' },
                      { month: '7月', label: '国語基礎完成', state: 'future' },
                      { month: '8月', label: '日本史知識完成', state: 'future' },
                      { month: '英', label: '', state: 'future' },
                    ].map((m, i) => (
                      <div key={i} style={{ flex: 1, position: 'relative', textAlign: 'center', zIndex: 1 }}>
                        <div style={{ fontSize: '8px', color: '#9CA3AF', position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                          {m.state === 'current' && (
                            <span style={{ display: 'inline-block', background: '#9A071A', color: '#fff', padding: '2px 6px', borderRadius: '8px', fontWeight: 700 }}>現在地</span>
                          )}
                        </div>
                        <div style={{ fontSize: '9px', color: m.state === 'current' ? '#9A071A' : '#9CA3AF', marginBottom: '2px', fontWeight: m.state === 'current' ? 700 : 400 }}>
                          {m.month}
                        </div>
                        <div style={{
                          width: '14px', height: '14px', margin: '0 auto', borderRadius: '50%',
                          background: m.state === 'done' ? '#9A071A' : m.state === 'current' ? '#fff' : '#fff',
                          border: m.state === 'current' ? '3px solid #9A071A' : m.state === 'done' ? 'none' : '2px solid #E5E7EB',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {m.state === 'done' && <span style={{ color: '#fff', fontSize: '8px', lineHeight: 1 }}>✓</span>}
                        </div>
                        <div style={{ fontSize: '8.5px', color: m.state === 'current' ? '#9A071A' : '#6B7280', marginTop: '4px', fontWeight: m.state === 'current' ? 700 : 400, whiteSpace: 'nowrap' }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: 直近模試 */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '14px 16px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>直近模試</div>
                    <div style={{ fontSize: '12px', color: '#2D2D3A' }}>
                      河合塾　全統模試 <span style={{ color: '#9CA3AF', fontSize: '10px' }}>2026-04-29</span>
                    </div>
                  </div>
                  <button style={{ fontSize: '10px', color: '#9A071A', border: '1px solid #9A071A', background: '#fff', padding: '4px 10px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                    + 模試を更新
                  </button>
                </div>

                {[
                  { subject: '国語', score: 54, target: 67, diff: -13, label: '重点課題', barColor: '#DC2626', bg: '#FEE2E2' },
                  { subject: '英語', score: 64, target: 68, diff: -4, label: '要強化', barColor: '#F59E0B', bg: '#FEF3C7' },
                  { subject: '日本史', score: 39, target: 67, diff: -28, label: '重点課題', barColor: '#DC2626', bg: '#FEE2E2' },
                ].map((s) => (
                  <div key={s.subject} style={{ background: s.bg, borderRadius: '8px', padding: '8px 10px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#2D2D3A' }}>{s.subject}</span>
                      <span style={{ fontSize: '9px', color: s.barColor, fontWeight: 700 }}>{s.label}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <div>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D3A' }}>{s.score}</span>
                        <span style={{ fontSize: '10px', color: '#9CA3AF', marginLeft: '4px' }}>/ 目標 {s.target}</span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: s.barColor }}>{s.diff}</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.6)', borderRadius: '999px' }}>
                      <div style={{ width: `${(s.score / s.target) * 100}%`, height: '100%', background: s.barColor, borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div style={{ background: '#fff', borderRadius: '999px', padding: '4px', marginBottom: '12px', display: 'flex', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                {['今月', '今週', '明日', '教材'].map((t, i) => (
                  <div key={t} style={{
                    flex: 1, textAlign: 'center', padding: '8px 0', fontSize: '11px',
                    background: i === 0 ? '#F3F0EA' : 'transparent',
                    borderRadius: '999px',
                    fontWeight: i === 0 ? 700 : 400,
                    color: i === 0 ? '#2D2D3A' : '#9CA3AF',
                  }}>
                    {t}
                  </div>
                ))}
              </div>

              {/* Card 4: 今月詰めるべき距離 */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#2D2D3A', marginBottom: '4px' }}>今月詰めるべき距離</div>
                <p style={{ fontSize: '10px', color: '#6B7280', marginBottom: '12px', lineHeight: 1.6 }}>
                  合格まで残り9ヶ月。月次マイルストーンを意識して進めましょう。
                </p>
                {[
                  { subject: '英語', task: '英文法ポラリス1 復習完成 + 語彙力強化', goal: '0/500語' },
                  { subject: '英語', task: '英文解釈ポラリス1 基礎構造理解', goal: '0/20例文' },
                  { subject: '国語', task: '現代文読解基礎固め', goal: '0/15題' },
                  { subject: '日本史', task: '通史理解・重要事項暗記', goal: '0/200項目' },
                ].map((t, i) => (
                  <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 10px', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#2D2D3A' }}>{t.subject}</span>
                      <span style={{ fontSize: '10px', color: '#9CA3AF' }}>{t.goal}</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#6B7280', marginBottom: '4px' }}>▸ {t.task}</div>
                    <div style={{ height: '2px', background: '#E5E7EB', borderRadius: '999px' }} />
                  </div>
                ))}
              </div>

              <div style={{ height: '40px' }} />
            </div>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#9CA3AF', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.8 }}>
          ※ 実戦実力／教材到達度／学習の質／計画整合度の4要素から距離を算出。<br />
          空回りした学習では距離は縮まりません。
        </p>

        {/* Mock exam → Task pipeline */}
        <div style={{ maxWidth: '900px', margin: '0 auto 56px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '2px', marginBottom: '8px' }}>
            FROM MOCK EXAM TO DAILY TASKS
          </p>
          <h3 style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: 1.7,
            color: 'var(--text)',
            marginBottom: '32px',
          }}>
            模試・過去問の写真を撮るだけで、<br className="mobile-br" />
            「翌日やるべきこと」まで落とし込む。
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            textAlign: 'left',
          }}>
            {[
              {
                step: 'STEP 01',
                title: '模試の帳票を撮影',
                desc: '紙の帳票をスマホで撮るだけ。科目別・分野別の成績分布を自動で読み取ります。',
              },
              {
                step: 'STEP 02',
                title: 'パイチャートで可視化',
                desc: '本人の現在地を分野ごとに分解し、何が強くて何が弱いかをひと目で把握します。',
              },
              {
                step: 'STEP 03',
                title: '志望校要件と差分照合',
                desc: '志望校の出題傾向・合格水準と照らし合わせ、深刻度の高い箇所から優先順位を確定します。',
              },
              {
                step: 'STEP 04',
                title: '月次→週次→翌日タスク',
                desc: '月次KPI・週次KPIに分解し、最終的に「翌日やるべき具体タスク」まで自動で提案します。',
              },
            ].map((item, i, arr) => (
              <div
                key={item.step}
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '20px 18px',
                  position: 'relative',
                }}
              >
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: 'var(--primary)',
                  marginBottom: '10px',
                  fontWeight: 700,
                }}>
                  {item.step}
                </p>
                <h4 style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  marginBottom: '8px',
                  color: 'var(--text)',
                }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                  {item.desc}
                </p>
                {i < arr.length - 1 && (
                  <span
                    aria-hidden
                    className="delto-step-arrow"
                    style={{
                      position: 'absolute',
                      right: '-12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--primary)',
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Three pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            maxWidth: '900px',
            margin: '0 auto 56px',
          }}
        >
          {[
            {
              num: '01',
              title: '努力量ではなく、距離で測る',
              desc: '勉強時間ではなく「合格までの差分」を客観的に定量化。今日の一手が距離を縮めたかが分かります。',
            },
            {
              num: '02',
              title: '空回りした学習は距離が縮まらない',
              desc: '志望校に適合しない教材・低い学習の質では距離は減らない設計。努力の方向を自然と正します。',
            },
            {
              num: '03',
              title: '5つの逆算マイルストーン',
              desc: '現状と合格目標日から、達成観点付きの主要マイルストーンを自動生成。橋渡しの設計図を提供します。',
            },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '28px 24px',
                textAlign: 'left',
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '14px',
                  letterSpacing: '2px',
                  color: 'var(--primary)',
                  marginBottom: '12px',
                }}
              >
                {item.num}
              </p>
              <h3
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  marginBottom: '10px',
                  color: 'var(--text)',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.9 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Use cases */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: '#FAFAF7',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px 22px',
              textAlign: 'left',
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', marginBottom: '6px' }}>
              FOR ESSENCE MEMBERS
            </p>
            <p style={{ fontSize: '13.5px', color: 'var(--text)', lineHeight: 1.8 }}>
              コーチが設計したロードマップ・進捗・KPIが自動でダッシュボードに反映されます。
            </p>
          </div>
          <div
            style={{
              background: '#FAFAF7',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '20px 22px',
              textAlign: 'left',
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', marginBottom: '6px' }}>
              FOR INDIVIDUAL USERS
            </p>
            <p style={{ fontSize: '13.5px', color: 'var(--text)', lineHeight: 1.8 }}>
              独学派の方は、志望校と日々の学習を入力するだけで距離測定を開始できます。
            </p>
          </div>
        </div>

        <p style={{ fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.5px' }}>
          Delto by Essence
        </p>
      </div>
      <style>{`
        .delto-screen::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .delto-step-arrow { display: none; }
        @media (min-width: 900px) {
          .delto-step-arrow { display: inline-block; }
        }
        @media (max-width: 767px) {
          .delto-title {
            font-size: 17px !important;
            line-height: 1.65 !important;
          }
          .delto-bezel {
            width: 260px !important;
            border-radius: 36px !important;
            padding: 11px !important;
          }
          .delto-bezel .delto-screen {
            border-radius: 26px !important;
            height: 540px !important;
          }
        }
      `}</style>
    </section>
  );
}
