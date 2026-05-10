'use client';

const cardBase = {
  background: '#fff',
  borderRadius: '12px',
  padding: '40px 32px 32px',
  boxShadow: '0 4px 20px rgba(154, 7, 26, 0.06)',
  border: '1px solid rgba(154, 7, 26, 0.08)',
  position: 'relative' as const,
};

const stepBadge = {
  position: 'absolute' as const,
  top: '-14px',
  left: '32px',
  background: 'var(--primary)',
  color: '#fff',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '2px',
  padding: '6px 14px',
  borderRadius: '4px',
};

const stepTitle = {
  fontFamily: "'Noto Serif JP', serif",
  fontSize: '22px',
  fontWeight: 600,
  marginTop: '4px',
  marginBottom: '16px',
  color: '#2D2D3A',
  lineHeight: 1.5,
};

const stepDesc = {
  fontSize: '14px',
  lineHeight: 1.9,
  color: '#4B5563',
  marginBottom: '0',
};

export default function ThinkingProcess() {
  return (
    <section
      className="thinking-process"
      id="thinking"
      style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #FAFAF7 0%, #F5F1EA 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1080px', position: 'relative', zIndex: 1 }}>
        <div className="animate-on-scroll" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p className="section-label" style={{ color: 'var(--primary)' }}>The Essence Method</p>
          <h2
            className="section-title thinking-title"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: '32px',
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            <span style={{ color: 'var(--primary)' }}>逆算思考</span>で導く、<br className="mobile-br" />合格までの最短ルート
          </h2>
          <p
            className="thinking-subtitle"
            style={{
              fontSize: '14.5px',
              color: '#6B7280',
              lineHeight: 1.9,
              maxWidth: '760px',
              margin: '0 auto',
            }}
          >
            差分を数値化し、その「正体」を能力レベルまで分解。本人の環境・性格・得意不得意と志望校の出題傾向を照らし合わせて優先度を設計し、残された時間から逆算して毎日のタスクへ落とし込みます。
          </p>
        </div>

        <div
          className="thinking-steps animate-on-scroll"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* STEP 01 — 定量化 */}
          <div className="thinking-step" style={cardBase}>
            <div style={stepBadge}>STEP 01</div>
            <div className="step-grid">
              <div className="step-text">
                <h3 style={stepTitle}>差分を数値で可視化</h3>
                <p style={stepDesc}>
                  過去問・模試・定着度テストから、科目×分野ごとの<strong style={{ color: 'var(--primary)' }}>差分</strong>を定量化。どこに何点の差があるのかを客観的な数字で明らかにします。
                </p>
              </div>
              <div className="step-visual">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: '英語', current: 62, target: 85 },
                    { label: '日本史', current: 48, target: 80 },
                    { label: '国語', current: 70, target: 75 },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>
                        <span>{s.label}</span>
                        <span>
                          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{s.current}</span> / {s.target}
                        </span>
                      </div>
                      <div style={{ position: 'relative', height: '8px', background: '#F3F0EA', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${s.current}%`, background: 'var(--primary)', borderRadius: '4px' }} />
                        <div style={{ position: 'absolute', left: `${s.target}%`, top: '-3px', height: '14px', width: '2px', background: '#C9A84C' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 02 — 質的分析 */}
          <div className="thinking-step" style={cardBase}>
            <div style={stepBadge}>STEP 02</div>
            <div className="step-grid">
              <div className="step-text">
                <h3 style={stepTitle}>差分の&quot;正体&quot;を能力で分解</h3>
                <p style={stepDesc}>
                  その点差は<strong style={{ color: 'var(--primary)' }}>どの能力の不足</strong>から来ているのか、質的に細分化。単なる知識不足なのか、読解力・処理速度・記述力のどこに課題があるのかを見極めます。
                </p>
              </div>
              <div className="step-visual">
                <div style={{ fontSize: '11.5px', color: '#6B7280', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  例）英語 23点差の内訳
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    { label: '単語・熟語の定着', pct: 30, tone: 'var(--primary)' },
                    { label: '長文の構造把握', pct: 45, tone: '#C9A84C' },
                    { label: '処理速度', pct: 15, tone: '#6B7280' },
                    { label: '記述の表現力', pct: 10, tone: '#9CA3AF' },
                  ].map((a) => (
                    <div key={a.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', marginBottom: '3px' }}>
                        <span>{a.label}</span>
                        <span style={{ color: a.tone, fontWeight: 700 }}>{a.pct}%</span>
                      </div>
                      <div style={{ height: '5px', background: '#F3F0EA', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${a.pct}%`, background: a.tone, borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 03 — 本人 × 志望校 */}
          <div className="thinking-step" style={cardBase}>
            <div style={stepBadge}>STEP 03</div>
            <div className="step-grid">
              <div className="step-text">
                <h3 style={stepTitle}>本人×志望校で優先度を設計</h3>
                <p style={stepDesc}>
                  <strong style={{ color: 'var(--primary)' }}>学習環境・性格・得意不得意</strong>と<strong style={{ color: 'var(--primary)' }}>志望校の出題傾向</strong>を掛け合わせ、「この人に合う順序」を決定します。
                </p>
              </div>
              <div className="step-visual">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '10px',
                    alignItems: 'stretch',
                  }}
                >
                  <div style={{ padding: '12px 12px', background: '#FAFAF7', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      本人の特性
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '11.5px', color: '#4B5563', lineHeight: 1.9 }}>
                      <li>• 部活引退後から</li>
                      <li>• 朝型・集中短め</li>
                      <li>• 暗記が苦手</li>
                      <li>• 読解は得意</li>
                    </ul>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '22px', fontWeight: 700 }}>
                    ×
                  </div>
                  <div style={{ padding: '12px 12px', background: '#FAFAF7', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#C9A84C', letterSpacing: '0.5px', marginBottom: '8px' }}>
                      志望校の傾向
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '11.5px', color: '#4B5563', lineHeight: 1.9 }}>
                      <li>• 長文比重が高い</li>
                      <li>• 記述多め</li>
                      <li>• 近現代史頻出</li>
                      <li>• 速読が鍵</li>
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: '12px',
                    padding: '10px 12px',
                    background: 'rgba(154, 7, 26, 0.06)',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    color: '#2D2D3A',
                    lineHeight: 1.6,
                    textAlign: 'center',
                  }}
                >
                  → <strong style={{ color: 'var(--primary)' }}>&quot;この人に合う順序&quot;</strong>を決定
                </div>
              </div>
            </div>
          </div>

          {/* STEP 04 — 時間逆算 × 日々のタスク */}
          <div className="thinking-step" style={cardBase}>
            <div style={stepBadge}>STEP 04</div>
            <div className="step-grid">
              <div className="step-text">
                <h3 style={stepTitle}>時間で並び替え、日々のタスクへ</h3>
                <p style={stepDesc}>
                  残された<strong style={{ color: 'var(--primary)' }}>月・週・日</strong>で優先度を並び替え、「何を・どう意識して」まで毎日具体化。参考書単位・分野単位のタスクに落とし込み、日々の行動を確実にします。
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
                  {[
                    { unit: '残', val: '8', label: 'ヶ月', tone: '#C9A84C' },
                    { unit: '今月', val: '4', label: '週', tone: 'var(--primary)' },
                    { unit: '今週', val: '7', label: '日', tone: '#2D2D3A' },
                  ].map((t) => (
                    <div
                      key={t.label}
                      style={{
                        flex: 1,
                        padding: '8px 6px',
                        background: '#FAFAF7',
                        borderLeft: `2px solid ${t.tone}`,
                        borderRadius: '4px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '10px', color: '#6B7280' }}>{t.unit}</div>
                      <div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 700, color: t.tone }}>{t.val}</span>
                        <span style={{ fontSize: '11px', color: '#4B5563', marginLeft: '3px' }}>{t.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="step-visual">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    {
                      p: 'A',
                      subject: '英語',
                      book: 'ポラリス2 Unit 5',
                      intent: '主張→具体例の構造を意識',
                      tone: 'var(--primary)',
                    },
                    {
                      p: 'A',
                      subject: '日本史',
                      book: '実力をつける100題 第42題',
                      intent: '因果を年表に書き出す',
                      tone: 'var(--primary)',
                    },
                    {
                      p: 'B',
                      subject: '国語',
                      book: 'ゴロゴ 301-350',
                      intent: '品詞を声に出して確認',
                      tone: '#C9A84C',
                    },
                    {
                      p: 'C',
                      subject: '英語',
                      book: 'シス単 1401-1500',
                      intent: '1秒で出ない語にマーク',
                      tone: '#9CA3AF',
                    },
                  ].map((t, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '10px 12px',
                        background: '#FAFAF7',
                        borderRadius: '6px',
                        borderLeft: `3px solid ${t.tone}`,
                      }}
                    >
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          background: t.tone,
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '3px',
                          flexShrink: 0,
                        }}
                      >
                        {t.p}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#2D2D3A', lineHeight: 1.5 }}>
                          <span style={{ color: t.tone, fontWeight: 700, marginRight: '6px' }}>{t.subject}</span>
                          {t.book}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280', lineHeight: 1.6, display: 'flex', gap: '4px', marginTop: '2px' }}>
                          <span style={{ color: '#C9A84C', fontWeight: 700, flexShrink: 0 }}>意識</span>
                          <span>{t.intent}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom summary line */}
        <div
          className="animate-on-scroll"
          style={{
            textAlign: 'center',
            padding: '32px 24px',
            background: 'rgba(154, 7, 26, 0.04)',
            borderRadius: '12px',
            border: '1px solid rgba(154, 7, 26, 0.1)',
            marginTop: '24px',
          }}
        >
          <p style={{ fontSize: '15px', lineHeight: 2.0, color: '#2D2D3A', fontWeight: 500 }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>努力の量</span>ではなく、
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>努力の方向と順序</span>を設計する。<br />
            これが、Essenceの本質的な考え方です。
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Desktop: horizontal inside each stacked card */
        .step-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: 40px;
          align-items: center;
        }
        .step-text { min-width: 0; }
        .step-visual { min-width: 0; }

        /* Desktop: hide the mobile-only <br>, let the whole title stay on one line */
        .thinking-title :global(.mobile-br) {
          display: none;
        }
        @media (max-width: 1023px) {
          .thinking-process {
            padding: 80px 0 !important;
          }
          .thinking-process :global(.section-title) {
            font-size: 22px !important;
          }
          .thinking-title :global(.mobile-br) {
            display: inline !important;
          }
          .thinking-subtitle {
            font-size: 13.5px !important;
            line-height: 1.9 !important;
            padding: 0 4px;
          }
          .step-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .thinking-step :global(h3) {
            font-size: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
