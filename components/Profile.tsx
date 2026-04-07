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
            早稲田大学社会科学部在学中。自身の受験経験を通じて「正しい方向への努力」の重要性を痛感し、
            2019年11月にオンライン受験コーチングサービス「Essence」を設立。
          </p>
          <p>
            これまでに743名以上の受験生をサポートし、第一志望合格率76%という高い実績を達成。
            受験生一人ひとりの「本質」を見極め、最短ルートで合格へ導くコーチングを提供しています。
          </p>
          <div className="profile-tags">
            <span className="profile-tag">早稲田大学社会科学部在学中</span>
            <span className="profile-tag">2019年設立</span>
            <span className="profile-tag">累計743名+指導</span>
            <span className="profile-tag">超少人数制</span>
          </div>
        </div>
      </div>
    </section>
  );
}
