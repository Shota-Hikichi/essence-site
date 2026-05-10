import HeroBgP4 from '@/components/HeroBg_P4';
import Link from 'next/link';

export default function TestP4() {
  return (
    <>
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 9999, display: 'flex', gap: '8px' }}>
        <Link href="/test-bg" style={{ padding: '10px 20px', background: '#333', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>一覧へ</Link>
        <Link href="/test-bg/p5" style={{ padding: '10px 20px', background: '#9A071A', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>次へ: P5</Link>
      </div>
      <section style={{ position: 'relative', minHeight: '100vh', background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <HeroBgP4 />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1140px', margin: '0 auto', padding: '140px 24px 100px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '42px', fontWeight: 600, color: '#2D2D3A', lineHeight: 1.5, marginBottom: '48px' }}>
              <span style={{ color: '#9A071A' }}>本質</span>を見極め、<br />最短ルートで志望校へ。
            </h1>
            <p style={{ fontSize: '16px', color: '#6B7280', lineHeight: 2, marginBottom: '64px' }}>
              決まったカリキュラムを押し付けるのではなく、<br />あなたの現在地と志望校の距離を逆算して、<br />合格点突破に必要なことだけを設計する本質コーチング
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 36px', borderRadius: '6px', fontSize: '15px', fontWeight: 700, background: '#9A071A', color: '#fff' }}>15分無料相談を予約する</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[{n:'76%',l:'第一志望合格率'},{n:'743+',l:'累計利用者数'},{n:'No.1',l:'早慶模試 全国1位'}].map(b=>(
              <div key={b.n} style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '28px 16px', textAlign: 'center', minHeight: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '48px', color: '#9A071A', lineHeight: 1, marginBottom: '6px' }}>{b.n}</div>
                <div style={{ fontSize: '14px', color: '#6B7280' }}>{b.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
