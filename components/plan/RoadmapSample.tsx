interface RoadmapSampleProps {
  variant?: 'standard' | 'fullcommit';
}

export default function RoadmapSample({ variant = 'standard' }: RoadmapSampleProps) {
  return (
    <section className="roadmap-section" id="roadmap">
      <div className="container">
        <div className="roadmap-intro">
          <span className="roadmap-sample-label">サンプル公開</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            実際のロードマップを見てみる
          </h2>
          <p>
            {variant === 'fullcommit'
              ? 'フルコミットプランでは、毎月ロードマップを更新し、常に最新の状況に合わせた計画をお渡しします。'
              : '入会時にお渡しする学習ロードマップのサンプルです。志望校・現在の実力に合わせて、科目ごとに最適な教材と学習スケジュールを設計します。'}
          </p>
        </div>

        <div className="roadmap-card">
          <div className="roadmap-card-header">
            <div>
              <h3>A.T さんの学習ロードマップ（サンプル）</h3>
              <span className="roadmap-meta">
                高3・4月入会 ｜ 志望校: 早稲田大学（文学部）・慶應義塾大学（文学部）
              </span>
            </div>
          </div>
          <div className="roadmap-card-body" style={{ padding: '32px' }}>
            {/* English */}
            <div className="roadmap-subject">
              <div className="roadmap-subject-header english">
                <div className="roadmap-subject-icon english">英</div>
                <h3>英語</h3>
              </div>
              <div className="roadmap-timeline">
                <div className="timeline-month">
                  <div className="timeline-month-label">4月 - 基礎固め</div>
                  <div className="timeline-items">
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">反復</span>ターゲット1900
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">反復</span>解体英熟語
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-mid" />
                      <span className="timeline-item-type">演習</span>やっておきたい英語長文500
                    </div>
                  </div>
                </div>
                <div className="timeline-month">
                  <div className="timeline-month-label">5月 - 文法・長文強化</div>
                  <div className="timeline-items">
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">反復</span>Vintage 英文法・語法
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-mid" />
                      <span className="timeline-item-type">演習</span>英作文ハイパートレーニング
                    </div>
                  </div>
                </div>
                <div className="timeline-month">
                  <div className="timeline-month-label">6月 - 実戦演習</div>
                  <div className="timeline-items">
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">演習</span>早稲田大学（文学部）過去問
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-mid" />
                      <span className="timeline-item-type">演習</span>慶應義塾大学 文学部過去問
                    </div>
                  </div>
                </div>
              </div>
              {variant === 'standard' && (
                <div className="roadmap-goals">
                  <h4>到達目標</h4>
                  <div className="goal-row">
                    <span className="goal-month-badge m4">4月末</span>
                    <span>基礎語彙・文法の完成（8割習得）</span>
                  </div>
                  <div className="goal-row">
                    <span className="goal-month-badge m5">5月末</span>
                    <span>標準レベル長文で安定7割、英作文の基本構文習得</span>
                  </div>
                  <div className="goal-row">
                    <span className="goal-month-badge m6">6月末</span>
                    <span>過去問で65%達成、併願校レベルで7割突破</span>
                  </div>
                </div>
              )}
            </div>

            {/* Japanese */}
            <div className="roadmap-subject">
              <div className="roadmap-subject-header japanese">
                <div className="roadmap-subject-icon japanese">国</div>
                <h3>国語</h3>
              </div>
              <div className="roadmap-timeline">
                <div className="timeline-month">
                  <div className="timeline-month-label">4月 - 古文・漢字基礎</div>
                  <div className="timeline-items">
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">反復</span>読んで見て覚える重要古文単語315
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">反復</span>入試頻出漢字+現代文重要語彙TOP2500
                    </div>
                    {variant === 'standard' && (
                      <div className="timeline-item">
                        <span className="timeline-item-priority priority-mid" />
                        <span className="timeline-item-type">演習</span>ステップアップノート30 古典文法基礎ドリル
                      </div>
                    )}
                  </div>
                </div>
                <div className="timeline-month">
                  <div className="timeline-month-label">
                    {variant === 'fullcommit' ? '5-6月 - 読解力養成 + 過去問' : '5月 - 読解力養成'}
                  </div>
                  <div className="timeline-items">
                    {variant === 'standard' && (
                      <>
                        <div className="timeline-item">
                          <span className="timeline-item-priority priority-high" />
                          <span className="timeline-item-type">反復</span>現代文の読み方＆解き方
                        </div>
                        <div className="timeline-item">
                          <span className="timeline-item-priority priority-mid" />
                          <span className="timeline-item-type">演習</span>入試現代文へのアクセス 基本編
                        </div>
                        <div className="timeline-item">
                          <span className="timeline-item-priority priority-low" />
                          <span className="timeline-item-type">反復</span>漢文早覚え速答法
                        </div>
                      </>
                    )}
                    {variant === 'fullcommit' && (
                      <>
                        <div className="timeline-item">
                          <span className="timeline-item-priority priority-high" />
                          <span className="timeline-item-type">演習</span>入試現代文へのアクセス 基本編
                        </div>
                        <div className="timeline-item">
                          <span className="timeline-item-priority priority-high" />
                          <span className="timeline-item-type">演習</span>早稲田大学（文学部）国語過去問
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {variant === 'standard' && (
                  <div className="timeline-month">
                    <div className="timeline-month-label">6-7月 - 過去問演習</div>
                    <div className="timeline-items">
                      <div className="timeline-item">
                        <span className="timeline-item-priority priority-high" />
                        <span className="timeline-item-type">演習</span>早稲田大学（文学部）国語過去問
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {variant === 'standard' && (
                <div className="roadmap-goals">
                  <h4>到達目標</h4>
                  <div className="goal-row">
                    <span className="goal-month-badge m4">4月末</span>
                    <span>古文単語315語完成、漢字・漢文基礎固め完了</span>
                  </div>
                  <div className="goal-row">
                    <span className="goal-month-badge m5">5月末</span>
                    <span>現代文読解法の習得、古文で6割突破</span>
                  </div>
                  <div className="goal-row">
                    <span className="goal-month-badge m6">7月末</span>
                    <span>早稲田文学部 国語で6割安定</span>
                  </div>
                </div>
              )}
            </div>

            {/* World History */}
            <div className="roadmap-subject">
              <div className="roadmap-subject-header history">
                <div className="roadmap-subject-icon history">史</div>
                <h3>世界史</h3>
              </div>
              <div className="roadmap-timeline">
                <div className="timeline-month">
                  <div className="timeline-month-label">4月 - 通史インプット</div>
                  <div className="timeline-items">
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">反復</span>ナビゲーター世界史
                    </div>
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">反復</span>山川 世界史一問一答
                    </div>
                    {variant === 'standard' && (
                      <div className="timeline-item">
                        <span className="timeline-item-priority priority-mid" />
                        <span className="timeline-item-type">反復</span>世界史用語マルチトレーニング
                      </div>
                    )}
                  </div>
                </div>
                <div className="timeline-month">
                  <div className="timeline-month-label">
                    {variant === 'fullcommit' ? '5-7月 - 演習 + 過去問' : '5月 - 演習開始'}
                  </div>
                  <div className="timeline-items">
                    <div className="timeline-item">
                      <span className="timeline-item-priority priority-high" />
                      <span className="timeline-item-type">演習</span>実力をつける世界史100題
                    </div>
                    {variant === 'fullcommit' && (
                      <div className="timeline-item">
                        <span className="timeline-item-priority priority-high" />
                        <span className="timeline-item-type">演習</span>早稲田大学（文学部）世界史過去問
                      </div>
                    )}
                  </div>
                </div>
                {variant === 'standard' && (
                  <div className="timeline-month">
                    <div className="timeline-month-label">6-7月 - 過去問演習</div>
                    <div className="timeline-items">
                      <div className="timeline-item">
                        <span className="timeline-item-priority priority-high" />
                        <span className="timeline-item-type">演習</span>早稲田大学（文学部）世界史過去問
                      </div>
                      <div className="timeline-item">
                        <span className="timeline-item-priority priority-mid" />
                        <span className="timeline-item-type">演習</span>慶應義塾大学 文学部過去問
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {variant === 'standard' && (
                <div className="roadmap-goals">
                  <h4>到達目標</h4>
                  <div className="goal-row">
                    <span className="goal-month-badge m4">4月末</span>
                    <span>通史の基礎固め、一問一答の5周完了</span>
                  </div>
                  <div className="goal-row">
                    <span className="goal-month-badge m5">5月末</span>
                    <span>苦手分野の克服、標準問題集で7割突破</span>
                  </div>
                  <div className="goal-row">
                    <span className="goal-month-badge m6">7月末</span>
                    <span>早稲田文学部 世界史で75%達成</span>
                  </div>
                </div>
              )}
            </div>

            <div className="sample-notice">
              {variant === 'fullcommit' ? (
                <>
                  これはサンプルです。フルコミットプランでは<strong>毎月ロードマップを更新</strong>し、進捗に合わせて最適化し続けます。<br />
                  各教材ごとの<strong>「効果を最大化するワンポイントアドバイス」</strong>も付属します。
                </>
              ) : (
                <>
                  これはサンプルです。実際のロードマップは、入会後のヒアリングをもとに一人ひとりに合わせてオーダーメイドで作成します。<br />
                  さらに各教材ごとの<strong>「効果を最大化するワンポイントアドバイス」</strong>も付属します。
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
