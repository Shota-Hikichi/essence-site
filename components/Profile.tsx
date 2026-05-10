import Image from 'next/image';

export default function Profile() {
  return (
    <section className="profile" id="profile">
      <div className="container">
        <div className="profile-image animate-on-scroll slide-left">
          <Image
            src="/founder.jpg"
            alt="引地 祥太"
            width={280}
            height={280}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
        <div className="profile-content animate-on-scroll slide-right">
          <p className="section-label">Founder</p>
          <p className="profile-name">SHOTA HIKICHI</p>
          <h2 className="profile-name-ja">引地 祥太</h2>
          <p>
            早稲田大学社会科学部在学中。高校3年生の冬、指定校推薦と自己推薦の2つに不合格となった経験から、
            そこから一般入試に向けて本格的な受験勉強を開始し、最終的に3学部への合格を勝ち取る。
            この経験を通じて「正しい方向への努力」の重要性を痛感し、2019年11月にオンライン受験コーチングサービス「Essence」を設立。
          </p>
          <p>
            これまでに743名以上の受験生をサポートし、第一志望合格率76%という高い実績を達成。
            受験生一人ひとりの「本質」を見極め、最短ルートで合格へ導くコーチングを提供しています。
          </p>
          <p>
            入学後は自身が代表を務める会社での事業売却を経て、リクルート・楽天をはじめとする大手企業内でコンサルタントとして業務に従事。
            オンラインコーチング業界で初めて<strong style={{ color: 'var(--primary)' }}>コンサルティング的な思考</strong>を受験の文脈に落とし込む革新的なサービスを設計し、圧倒的な合格実績を残している。
          </p>
          <div className="profile-tags">
            <span className="profile-tag">早稲田大学社会科学部在学中</span>
            <span className="profile-tag">2019年設立</span>
            <span className="profile-tag">累計743名+指導</span>
            <span className="profile-tag">超少人数制</span>
          </div>
          <div className="profile-youtube-wrap" style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a
              href="https://youtu.be/QprTYCFTIdg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 22px',
                background: '#FF0000',
                color: '#fff',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0 -3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTubeで見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
