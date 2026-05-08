import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表示 | ESSENCE',
};

const rows = [
  { label: '販売業者', value: '株式会社BaySherwood' },
  { label: '運営統括責任者名', value: '引地 祥太' },
  { label: '郵便番号', value: '〒060-0042' },
  { label: '所在地', value: '北海道札幌市中央区大通西3-6' },
  { label: 'メールアドレス', value: 'info@baysherwood.net' },
  { label: 'ホームページ', value: 'www.baysherwood.jp' },
  { label: '販売価格', value: '各商品ページをご参照ください。' },
  { label: '引き渡し時期', value: 'ご注文から3営業日以内に発送いたします。' },
  { label: '商品代金以外の必要料金', value: '消費税：税込価格で表記しております' },
  { label: '返品・交換・キャンセル等', value: '返品期限：商品到着より3日以内' },
  {
    label: '支払い方法',
    value:
      'クレジットカード決済：ご注文時にお支払いが確定します。毎月自動で継続課金されます。\n銀行振込：都度お振込みによるお支払いとなります。自動更新はされません。次回のご利用時は再度お申し込みください。',
  },
  {
    label: '銀行振込先',
    value:
      '金融機関：北洋銀行\n支店名：札幌駅前支店（支店番号：116）\n口座種別：普通\n口座番号：3019898\n口座名義：カ）ベイシャーウッド',
  },
  {
    label: '自動継続課金について',
    value:
      'クレジットカード決済をご選択の場合、サービス利用料は毎月自動的に更新・課金されます。解約をご希望の場合は、次回更新日の前日までにマイページよりお手続きください。\n銀行振込をご選択の場合、自動更新は行われません。継続してご利用いただく場合は、都度お申し込みおよびお振込みが必要です。',
  },
];

export default function TokushohoPage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: '#6B7280',
            marginBottom: '32px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          トップに戻る
        </Link>

        <h1
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: '28px',
            fontWeight: 600,
            marginBottom: '48px',
            color: '#2D2D3A',
          }}
        >
          特定商取引法に基づく表示
        </h1>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '15px',
          }}
        >
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <th
                  style={{
                    padding: '16px 16px 16px 0',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2D2D3A',
                    verticalAlign: 'top',
                    whiteSpace: 'nowrap',
                    width: '180px',
                  }}
                >
                  {row.label}
                </th>
                <td
                  style={{
                    padding: '16px 0',
                    color: '#6B7280',
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
