import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  alternates: { canonical: 'https://www.essence-coaching.net/tokushoho' },
};

interface Row {
  label: string;
  value: string;
}

const rows: Row[] = [
  {
    label: '販売事業者',
    value: '株式会社BaySherwood',
  },
  {
    label: '運営統括責任者',
    value: '引地 祥太',
  },
  {
    label: '所在地',
    value: '〒060-0042\n北海道札幌市中央区大通西3-6',
  },
  {
    label: '電話番号',
    value:
      '080-6097-7422\n受付時間：平日 10:00〜18:00（土日祝を除く）\n※お問い合わせは原則としてメールにてお願いいたします。',
  },
  {
    label: 'メールアドレス',
    value: 'info@baysherwood.net',
  },
  {
    label: 'ホームページURL',
    value: 'https://www.essence-coaching.net',
  },
  {
    label: '販売価格',
    value:
      '各プランのご利用料金（いずれも消費税込・月額）\n・ミニマムプラン：29,800円\n・スタンダードプラン：39,800円\n・フルコミットプラン：49,800円\n※最新の価格は本ウェブサイト内の各プランページにて表示しております。',
  },
  {
    label: '商品代金以外に必要な費用',
    value:
      '・消費税：販売価格は消費税込の金額で表示しております。\n・インターネット接続料金および通信費：本サービスのご利用に必要な通信費（電話相談時の通話料金を含む）はお客様のご負担となります。',
  },
  {
    label: 'お支払方法',
    value:
      'クレジットカード決済（Visa / Mastercard / American Express / JCB）：ご注文時にお支払いが確定します。毎月自動で継続課金されます。\n銀行振込：都度お振込みによるお支払いとなります。自動更新はされません。次回のご利用時は再度お申し込みください。',
  },
  {
    label: '銀行振込先',
    value:
      '金融機関：北洋銀行\n支店名：札幌駅前支店（支店番号：116）\n口座種別：普通\n口座番号：3019898\n口座名義：カ）ベイシャーウッド',
  },
  {
    label: '代金の支払時期',
    value:
      'クレジットカード決済の場合：お申込み手続き完了時に当該月分の料金を課金し、以降は毎月の更新日に自動的に課金いたします（前払い）。\n銀行振込の場合：お申込み後、当社よりお送りするご案内に従い指定口座へお振込みください。',
  },
  {
    label: '役務の提供時期',
    value:
      'ご決済完了後、原則として3営業日以内に担当コーチよりご連絡を差し上げ、サービスを開始いたします。サービスの提供期間は、1回のご決済につきご決済日から起算して1か月間です。',
  },
  {
    label: '自動継続課金について',
    value:
      'クレジットカード決済をご選択の場合、本サービスのご利用料金はご決済日の翌日から起算して30日後に自動的に更新・課金される仕組みとなっております。解約をご希望の場合は、次回更新日の前日までに当社所定の方法によりお手続きください。\n銀行振込をご選択の場合、自動更新は行われません。継続してご利用いただく場合は、都度お申し込みおよびお振込みが必要です。',
  },
  {
    label: '販売数量',
    value: '原則として制限はございません。ただし、当社の運営上の都合により各プランに定員を設ける場合がございます。',
  },
  {
    label: '申込の有効期限',
    value: '特にございません。',
  },
  {
    label: '申込みの撤回・契約の解除（中途解約）',
    value:
      '本サービスはデジタル役務（オンラインによる情報提供型サービス）を通信販売の形態で提供するものであり、特定商取引法上のクーリング・オフ制度の適用はございません。\nご決済完了後のお客様のご都合による中途解約およびご返金は、役務の性質上お受けできません。\nただし、当社の責めに帰すべき事由によりサービスを提供できなかった場合は、該当期間分の料金を全額ご返金いたします。\nクレジットカードの自動継続課金を停止される場合は、次回更新日の前日までにお手続きください。',
  },
  {
    label: '不良品・役務提供不備への対応',
    value:
      '当社の責めに帰すべき事由により役務が提供されなかった場合、当社までご連絡ください。速やかに代替の提供日程を調整するか、または当該期間分の料金を返金いたします。',
  },
  {
    label: '動作環境',
    value:
      '本サービスのご利用には以下の環境が必要となります。\n・インターネット接続環境\n・パソコンまたはスマートフォン\n・最新版の主要ウェブブラウザ（Google Chrome / Safari / Microsoft Edge / Firefox）\n・電話相談ご利用時：マイク・カメラ付きデバイスおよびZoom等のビデオ通話アプリケーション',
  },
  {
    label: '特記事項',
    value:
      '・本サービスは学習支援および学習伴走を目的としたコーチングサービスであり、志望校への合格を保証するものではありません。\n・掲載されている合格率・合格実績は過去の実績に基づく数値であり、個別の成果を保証するものではありません。',
  },
];

export default function TokushohoPage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
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
            marginBottom: '16px',
            color: '#2D2D3A',
          }}
        >
          特定商取引法に基づく表記
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: 1.9,
            marginBottom: '40px',
          }}
        >
          「特定商取引に関する法律」第11条に基づき、本サービスに関する情報を以下のとおり表示いたします。
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14.5px',
          }}
        >
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <th
                  className="tkh-th"
                  style={{
                    padding: '18px 16px 18px 0',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: '#2D2D3A',
                    verticalAlign: 'top',
                    width: '260px',
                    lineHeight: 1.6,
                  }}
                >
                  {row.label}
                </th>
                <td
                  style={{
                    padding: '18px 0',
                    color: '#4B5563',
                    lineHeight: 2.0,
                    whiteSpace: 'pre-line',
                    verticalAlign: 'top',
                  }}
                >
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p
          style={{
            fontSize: '12px',
            color: '#9CA3AF',
            marginTop: '40px',
            lineHeight: 1.8,
          }}
        >
          制定日：2026年4月20日
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .tkh-th {
            display: block;
            width: 100% !important;
            padding-bottom: 4px !important;
            padding-top: 18px !important;
          }
          .tkh-th + td {
            display: block;
            padding-top: 0 !important;
            padding-bottom: 18px !important;
          }
        }
      `}</style>
    </main>
  );
}
