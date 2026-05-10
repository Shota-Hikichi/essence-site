import Link from 'next/link';
export default function TestBgIndex() {
  return (
    <main style={{ paddingTop: '140px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '32px' }}>背景アニメーション テスト</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
        <Link href="/test-bg/a" style={{ padding: '16px', background: '#9A071A', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>A: DNA螺旋</Link>
        <Link href="/test-bg/b" style={{ padding: '16px', background: '#9A071A', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>B: 星座マップ</Link>
        <Link href="/test-bg/c" style={{ padding: '16px', background: '#9A071A', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>C: 波紋＋収束</Link>
        <div style={{ borderTop: '1px solid #E5E7EB', margin: '8px 0' }} />
        <Link href="/test-bg/p1" style={{ padding: '16px', background: '#C9A84C', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>P1: Blueprint Grid（設計図グリッド）</Link>
        <Link href="/test-bg/p2" style={{ padding: '16px', background: '#C9A84C', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>P2: Branching Tree（学習マインドマップ）</Link>
        <Link href="/test-bg/p3" style={{ padding: '16px', background: '#C9A84C', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>P3: Ascending Steps（階段上昇）</Link>
        <Link href="/test-bg/p4" style={{ padding: '16px', background: '#C9A84C', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>P4: Orbital System（軌道系）</Link>
        <Link href="/test-bg/p5" style={{ padding: '16px', background: '#C9A84C', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>P5: Data Flow（データフロー）</Link>
        <div style={{ borderTop: '1px solid #E5E7EB', margin: '8px 0' }} />
        <div style={{ fontSize: '14px', color: '#7A0515', fontWeight: 700, marginTop: '4px' }}>ツリー系（合格逆算）</div>
        <Link href="/test-bg/t1" style={{ padding: '16px', background: '#7A0515', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>T1: Flowing Growth（有機成長）</Link>
        <Link href="/test-bg/t2" style={{ padding: '16px', background: '#7A0515', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>T2: Electric Network（回路通電）</Link>
        <Link href="/test-bg/t3" style={{ padding: '16px', background: '#7A0515', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>T3: Waterfall Cascade（滝カスケード）</Link>
        <Link href="/test-bg/t4" style={{ padding: '16px', background: '#7A0515', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>T4: Breathing Organism（呼吸する生命体）</Link>
        <Link href="/test-bg/t5" style={{ padding: '16px', background: '#7A0515', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>T5: Construction Blueprint（設計図）</Link>
        <div style={{ borderTop: '1px solid #E5E7EB', margin: '8px 0' }} />
        <Link href="/" style={{ padding: '16px', background: '#333', color: '#fff', borderRadius: '8px', fontWeight: 700 }}>現在の本番（逆算パス）</Link>
      </div>
    </main>
  );
}
