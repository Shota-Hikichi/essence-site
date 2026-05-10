export default function ReportSample() {
  return (
    <section className="animate-on-scroll" style={{ padding: '100px 0', background: 'var(--light-bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="section-label">Progress Report</p>
        <h2 className="section-title">毎週届く、あなた専用の進捗レポート</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 56px' }}>
          スタンダードプランでは月次、フルコミットプランでは週次で、学習の進捗を可視化した詳細レポートをお届けします。
        </p>

        {/* Report preview card */}
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', textAlign: 'left' }}>
          {/* Header */}
          <div style={{ padding: '28px 36px', borderBottom: '3px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '12px', letterSpacing: '3px', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>ESSENCE</p>
              <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '22px', fontWeight: 600, color: 'var(--text)' }}>A.T 様</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Report Period</p>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>2026-01-12 〜 2026-04-08</p>
            </div>
          </div>

          {/* Subject Balance */}
          <div style={{ padding: '28px 36px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>科目バランス</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Donut chart placeholder */}
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: `conic-gradient(#9A071A 0% 40%, #C9A84C 40% 75%, #6B7280 75% 90%, #D4D4D8 90% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#fff' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {[
                  { subject: '世界史', pct: '40%', color: '#9A071A', desc: '過去問演習・知識補強' },
                  { subject: '英語', pct: '35%', color: '#C9A84C', desc: '各学部別対策・英作文' },
                  { subject: '小論文', pct: '15%', color: '#6B7280', desc: '要約・論述構成の練習' },
                  { subject: '国語', pct: '10%', color: '#D4D4D8', desc: '現代文演習' },
                ].map(item => (
                  <div key={item.subject} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '50px' }}>{item.subject}</span>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '16px', color: item.color, minWidth: '36px' }}>{item.pct}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* 来週の学習方針 */}
          <div style={{ padding: '28px 36px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>来週の学習方針</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                {
                  num: '1',
                  title: '世界史知識の最終定着と各学部対策',
                  materials: '過去問、一問一答問題集、用語集',
                  method: '午前中2時間を過去問2年分に充て、午後1時間で別学部の過去問を演習。間違えた箇所は即座に用語集で確認し、翌日の朝30分で復習。',
                  goal: '学部別の対策により得点安定化を図る',
                },
                {
                  num: '2',
                  title: '英語各学部別対策の完成',
                  materials: '各学部過去問、英作文問題集',
                  method: '毎日1学部の過去問を2時間で演習し、英作文は1日1題のペース。週3回は音読による復習を30分実施。',
                  goal: '各学部の出題形式に特化した対策で得点力向上',
                },
                {
                  num: '3',
                  title: '小論文の論述技術完成',
                  materials: '各学部の小論文過去問、添削済み答案',
                  method: '隔日で1題を執筆。400字程度の短文での要約練習を重視。1題につき1時間の執筆、30分の見直し。',
                  goal: '直前期の集中対策で合格レベルまで引き上げ',
                },
              ].map(item => (
                <div key={item.num} style={{ padding: '20px', background: 'var(--light-bg)', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: 'var(--primary)' }}>{item.num}.</span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>{item.title}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '6px 12px', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>使用教材</span>
                    <span style={{ color: 'var(--text)' }}>{item.materials}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>進め方</span>
                    <span style={{ color: 'var(--text)' }}>{item.method}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>狙い</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{item.goal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '24px' }}>
          ※ サンプルです。実際のレポートは受講生の学習内容に合わせてカスタマイズされます。
        </p>
      </div>
    </section>
  );
}
