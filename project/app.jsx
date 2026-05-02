/* global React */
// KOPMI homepage. Components.

/**
 * Live strip. 3 conditional states driven by props.
 *  status: "live" | "reveal" | "upcoming"
 *  battle: { n, player, percent, winner, date }
 * BACKEND: read battle_status from API and pick the variant.
 */
function KopmiLiveStrip({ status = "live", battle = {} }) {
  const {
    n = 3,
    player = "Tchouameni",
    percent = 41,
    winner = "ACE",
    date = "vendredi",
  } = battle;

  if (status === "reveal") {
    return (
      <div className="live-strip live-strip--reveal">
        <a href="#battles">
          <span className="live-strip__chip live-strip__chip--reveal">RÉSULTAT</span>
          <span>
            🏆 Battle {String(n).padStart(2, "0")} : <strong>{winner}</strong> l'emporte avec {percent}% des votes
          </span>
          <span className="live-strip__cta">→</span>
        </a>
      </div>
    );
  }

  if (status === "upcoming") {
    return (
      <div className="live-strip live-strip--upcoming">
        <a href="#battles">
          <span className="live-strip__chip live-strip__chip--upcoming">PROCHAINE</span>
          <span>
            Prochaine battle : <strong>{player}</strong> · {date} à 19h · 3 hymnes en route
          </span>
          <span className="live-strip__cta">→</span>
        </a>
      </div>
    );
  }

  // default: live
  return (
    <div className="live-strip live-strip--live">
      <a href="#battles">
        <span className="live-strip__dot"></span>
        <span className="live-strip__chip">LIVE</span>
        <span>
          Battle {String(n).padStart(2, "0")} {player} · 3 hymnes en compétition · Vote ouvert
        </span>
        <span className="live-strip__cta">→</span>
      </a>
    </div>
  );
}

const KopmiHeader = ({ active = "home", cartCount = 2 }) => (
  <header className="k-header">
    <div className="k-header__brand">
      <img src="assets/logo/logo_kopmi.svg" alt="KOPMI" />
      KOPMI
    </div>
    <nav className="k-nav">
      <a className={active === "home" ? "active" : ""}>Accueil</a>
      <a className={active === "shop" ? "active" : ""}>Boutique</a>
      <a className={active === "mascots" ? "active" : ""}>Mascottes</a>
      <a className={active === "battles" ? "active" : ""}>Battles</a>
      <a className={active === "pronostic" ? "active" : ""}>Pronostic</a>
    </nav>
    <div className="k-header__icons">
      <button className="k-icon-btn" aria-label="Recherche">⌕</button>
      <button className="k-icon-btn" aria-label="Compte">◔</button>
      <button className="k-icon-btn k-icon-btn--cart" aria-label="Panier" data-count={cartCount}>🛒</button>
    </div>
  </header>
);

function Hero() {
  return (
    <section className="hero">
      <div className="hero__pattern"></div>
      <div className="hero__glow"></div>
      <div className="hero__grid">
        <div>
          <span className="chip-gold">★ Édition CDM 2026</span>
          <h1>
            Le kop a une<br/>
            <span className="gold-grad">voix.</span> Elle est<br/>
            en peluche.
          </h1>
          <p className="hero__lead">
            Trois mascottes peluches qui chantent la passion du foot français.
            Drill, reggae, rock. Une seule famille.
          </p>
          <div className="hero__ctas">
            <button className="btn btn--gold btn--lg">Précommander la peluche →</button>
            <button className="btn btn--ghost-light btn--lg">Voir les battles</button>
          </div>
        </div>

        <div className="hero__trio">
          <img
            className="hero__trio-img hero__trio-img--side"
            src="assets/mascots/blaze_full.png"
            alt="BLAZE"
            style={{ left: '-10%', bottom: '4%' }}
          />
          <img
            className="hero__trio-img hero__trio-img--side"
            src="assets/mascots/riff_full.png"
            alt="RIFF"
            style={{ right: '-10%', bottom: '4%' }}
          />
          <img
            className="hero__trio-img hero__trio-img--lead"
            src="assets/mascots/ace_full.png"
            alt="ACE"
          />
          />
        </div>
      </div>
    </section>
  );
}

function BattleBanner() {
  const [time, setTime] = React.useState({ h: 14, m: 27, s: 43 });
  React.useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        let { h, m, s } = t;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');

  return (
    <section className="battle-banner" data-screen-label="04 Battle banner">
      <div className="battle-banner__inner">
        <div>
          <div className="battle-banner__label">
            <span className="dot"></span>
            Battle 03/10 · Tchouameni
          </div>
          <h3>3 hymnes. 1 vote. Le kop décide.</h3>
          <div className="battle-banner__scores">
            <span className="score-pill"><span className="swatch" style={{ background: '#1F2D5A' }}></span> ACE 41%</span>
            <span className="score-pill"><span className="swatch" style={{ background: '#1B5E20' }}></span> BLAZE 22%</span>
            <span className="score-pill"><span className="swatch" style={{ background: '#8B0000' }}></span> RIFF 37%</span>
            <span className="battle-banner__votes">· 4 821 votes</span>
          </div>
        </div>
        <div className="countdown" aria-label="Temps restant">
          <div className="countdown__cell">
            <div className="countdown__num">{pad(time.h)}</div>
            <div className="countdown__label">Heures</div>
          </div>
          <div className="countdown__cell">
            <div className="countdown__num">{pad(time.m)}</div>
            <div className="countdown__label">Minutes</div>
          </div>
          <div className="countdown__cell">
            <div className="countdown__num">{pad(time.s)}</div>
            <div className="countdown__label">Secondes</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrioMascots() {
  return (
    <section className="section" data-screen-label="05 Trio mascottes">
      <div className="section__inner">
        <div className="section__head">
          <div>
            <span className="eyebrow">Les KOPMIS</span>
            <h2>Trois voix. Un seul kop.</h2>
          </div>
          <p style={{ maxWidth: '36ch' }}>
            Chacun son animal, son style musical, son verbe. Tu choisis ta tribune.
          </p>
        </div>

        <div className="trio-grid">
          {/* ACE */}
          <article className="mcard mcard--ace">
            <div className="mcard__top">
              <span className="mcard__badge">🦅 Drill · Aigle</span>
              <h3 className="mcard__title">ACE</h3>
              <p className="mcard__sub">"Han. Brr. Le kop écoute."</p>
            </div>
            <div className="mcard__img">
              <img src="assets/mascots/ace_full.png" alt="ACE" />
            </div>
            <button className="mcard__cta">Univers ACE →</button>
          </article>

          {/* BLAZE */}
          <article className="mcard mcard--blaze">
            <div className="mcard__top">
              <span className="mcard__badge">🍃 Reggae · Élan</span>
              <h3 className="mcard__title">Blaze</h3>
              <p className="mcard__sub">"Yeah man, easy. On est ensemble."</p>
            </div>
            <div className="mcard__img">
              <img src="assets/mascots/blaze_full.png" alt="BLAZE" />
            </div>
            <div className="mcard__overlay"></div>
            <button className="mcard__cta">Univers BLAZE →</button>
          </article>

          {/* RIFF */}
          <article className="mcard mcard--riff">
            <div className="mcard__top">
              <span className="mcard__badge">🤘 Rock · Jaguar</span>
              <h3 className="mcard__title">RIFF</h3>
              <p className="mcard__sub">ALLEZ ALLEZ ALLEZ !</p>
            </div>
            <div className="mcard__img">
              <img src="assets/mascots/riff_full.png" alt="RIFF" />
            </div>
            <button className="mcard__cta">Univers RIFF →</button>
          </article>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', t: '10 joueurs des Bleus mis à l\'honneur', pill: '10 battles', cls: '' },
    { n: '02', t: '× 3 versions par joueur (drill, reggae, rock)', pill: 'ACE · BLAZE · RIFF', cls: 'step__pill--ace' },
    { n: '03', t: 'Tu votes ta préférée. +5 pts par vote, +25 pts si tu as voté pour la gagnante', pill: '+5 / +25 pts', cls: 'step__pill--blaze' },
    { n: '04', t: 'La mascotte avec le plus de victoires sur 10 battles remporte le trophée KOPMIS', pill: '🏆 KOPMIS', cls: 'step__pill--riff' },
  ];
  return (
    <section className="section section--cream" data-screen-label="06 Système 10x3">
      <div className="section__inner">
        <div className="section__head section__head--center">
          <span className="eyebrow">Comment ça marche</span>
          <h2>Le système 10 × 3 = 30 hymnes</h2>
          <p>Pour chaque joueur des Bleus, les 3 KOPMIS proposent leur version. Toi, tu votes. Le kop décide.</p>
        </div>

        {/* SCHEMA — central pedagogical diagram */}
        <div className="schema">
          {/* row 1: player */}
          <div className="schema__row schema__row--player">
            <div className="schema__player">
              <div className="schema__player-eyebrow">Joueur exemple</div>
              <div className="schema__player-name">Tchouameni</div>
            </div>
          </div>

          {/* arrow down + branching */}
          <div className="schema__branches">
            <div className="schema__branch-line"></div>
            <div className="schema__arrow schema__arrow--down">↓</div>
          </div>

          {/* row 2: 3 mascot columns */}
          <div className="schema__row schema__row--mascots">
            <div className="schema-col schema-col--ace">
              <div className="schema-col__head">
                <div className="schema-col__name">ACE</div>
                <div className="schema-col__style">drill</div>
              </div>
              <div className="schema-col__arrow">↓</div>
              <div className="schema-col__score schema-col__score--winner">
                <span className="schema-col__pct">41%</span>
                <span className="schema-col__crown">🏆</span>
              </div>
              <div className="schema-col__bar">
                <div className="schema-col__fill" style={{ width: '41%' }}></div>
              </div>
            </div>

            <div className="schema-col schema-col--blaze">
              <div className="schema-col__head">
                <div className="schema-col__name">BLAZE</div>
                <div className="schema-col__style">reggae</div>
              </div>
              <div className="schema-col__arrow">↓</div>
              <div className="schema-col__score">
                <span className="schema-col__pct">22%</span>
              </div>
              <div className="schema-col__bar">
                <div className="schema-col__fill" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div className="schema-col schema-col--riff">
              <div className="schema-col__head">
                <div className="schema-col__name">RIFF</div>
                <div className="schema-col__style">rock</div>
              </div>
              <div className="schema-col__arrow">↓</div>
              <div className="schema-col__score">
                <span className="schema-col__pct">37%</span>
              </div>
              <div className="schema-col__bar">
                <div className="schema-col__fill" style={{ width: '37%' }}></div>
              </div>
            </div>
          </div>

          {/* row 3: vote callout */}
          <div className="schema__vote">
            <span className="schema__vote-tag">Tu votes ici</span>
            <span className="schema__vote-arrow">↓</span>
          </div>

          {/* row 4: outcome */}
          <div className="schema__outcome">
            <div className="schema__outcome-line">
              <span className="schema__outcome-trophy">🏆</span>
              <strong>ACE</strong>
              <span className="schema__outcome-verb">l'emporte sur Tchouameni</span>
            </div>
            <div className="schema__outcome-bonus">
              +25 pts pour les fans qui ont voté ACE
            </div>
          </div>
        </div>

        {/* MICRO-CARDS chiffres clés */}
        <div className="steps-grid">
          {steps.map(s => (
            <div className="step" key={s.n}>
              <div className="step__num">{s.n}</div>
              <p className="step__desc step__desc--strong">{s.t}</p>
              <span className={`step__pill ${s.cls}`}>{s.pill}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button className="btn btn--primary btn--lg">Voir toutes les battles →</button>
        </div>
      </div>
    </section>
  );
}

function Boutique() {
  return (
    <section className="section section--cream" data-screen-label="07 Boutique" style={{ paddingTop: 0 }}>
      <div className="section__inner">
        <div className="section__head">
          <div>
            <span className="eyebrow">Boutique · Précommande ouverte</span>
            <h2>Choisis ta KOPMI.</h2>
          </div>
          <p style={{ maxWidth: '40ch' }}>
            39€ la peluche. Seuil 50 commandes ou remboursement 100%. Pas de risque, juste du kop.
          </p>
        </div>

        <div className="shop-grid">
          <article className="product product--ace">
            <span className="product__badge">Précommande</span>
            <div className="product__img">
              <img src="assets/mascots/ace_portrait_3.png" alt="" />
            </div>
            <div className="product__bottom">
              <div>
                <h3 className="product__title">Peluche ACE</h3>
                <div className="product__price">39 €</div>
              </div>
              <button className="product__plus" aria-label="Ajouter">+</button>
            </div>
          </article>

          <article className="product product--blaze">
            <span className="product__badge">Précommande</span>
            <div className="product__img">
              <img src="assets/mascots/blaze_pack_portrait.png" alt="Peluche BLAZE en hoodie blanc des Bleus extérieur" />
            </div>
            <div className="product__bottom">
              <div>
                <h3 className="product__title">Peluche BLAZE</h3>
                <div className="product__price">39 €</div>
              </div>
              <button className="product__plus" aria-label="Ajouter">+</button>
            </div>
          </article>

          <article className="product product--riff">
            <span className="product__badge">Précommande</span>
            <div className="product__img">
              <img src="assets/mascots/riff_portrait.png" alt="" />
            </div>
            <div className="product__bottom">
              <div>
                <h3 className="product__title">Peluche RIFF</h3>
                <div className="product__price">39 €</div>
              </div>
              <button className="product__plus" aria-label="Ajouter">+</button>
            </div>
          </article>

          <article className="product product--pack">
            <span className="product__badge">★ Pack trio</span>
            <div className="product__img product__img--triophoto">
              <img src="assets/mascots/trio_pack.png" alt="Pack des 3 peluches RIFF, ACE et BLAZE" />
            </div>
            <div className="product__bottom">
              <div>
                <h3 className="product__title">Pack trio KOPMIS</h3>
                <div className="product__price">99 €</div>
              </div>
              <button className="product__plus" aria-label="Ajouter">+</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function KopmiFooter() {
  return (
    <footer className="k-footer" data-screen-label="08 Footer">
      <div className="k-footer__inner">
        <div className="k-footer__grid">
          <div>
            <div className="k-footer__brand">
              <img src="assets/logo/logo_kopmi.svg" alt="" />
              KOPMI
            </div>
            <p className="k-footer__pitch">
              Le kop a une voix. Elle est en peluche.<br/>
              3 mascottes, 30 hymnes, le foot français façon tribune contemporaine.
            </p>
            <div className="k-footer__socials">
              <a aria-label="TikTok">TT</a>
              <a aria-label="Instagram">IG</a>
              <a aria-label="YouTube">YT</a>
            </div>
          </div>
          <div>
            <h5>Boutique</h5>
            <ul>
              <li><a>Peluche ACE</a></li>
              <li><a>Peluche BLAZE</a></li>
              <li><a>Peluche RIFF</a></li>
              <li><a>Pack trio 99€</a></li>
              <li><a>Édition CDM 2026</a></li>
            </ul>
          </div>
          <div>
            <h5>Aventure</h5>
            <ul>
              <li><a>Battles 10 × 3</a></li>
              <li><a>Pronostic Grand Tirage</a></li>
              <li><a>Trophée KOPMIS</a></li>
              <li><a>Monsieur Kop</a></li>
              <li><a>14.07.26 · TikTok Live</a></li>
            </ul>
          </div>
          <div>
            <h5>Légal</h5>
            <ul>
              <li><a>SAS Kurohé</a></li>
              <li><a>contact@kopmi.fr</a></li>
              <li><a>CGV / Mentions légales</a></li>
              <li><a>Politique de remboursement</a></li>
              <li><a>Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>
        <div className="k-footer__legal">
          © 2026 KOPMI by <strong>Kurohé SAS</strong> · Édition Coupe du Monde 2026 · Projet indépendant
          non affilié à la FIFA, à la FFF, à la LFP, à TikTok ni à aucun club professionnel.
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "live_strip_status": "live"
  }/*EDITMODE-END*/);

  const battles = {
    live:     { n: 3,  player: 'Tchouameni', percent: 41, winner: 'ACE',   date: 'vendredi' },
    reveal:   { n: 3,  player: 'Tchouameni', percent: 41, winner: 'ACE',   date: 'vendredi' },
    upcoming: { n: 4,  player: 'Mbappé',     percent: 0,  winner: '',      date: 'vendredi' },
  };

  return (
    <>
      <KopmiLiveStrip status={tweaks.live_strip_status} battle={battles[tweaks.live_strip_status]} />
      <KopmiHeader active="home" />
      <main>
        <Hero />
        <BattleBanner />
        <TrioMascots />
        <HowItWorks />
        <Boutique />
      </main>
      <KopmiFooter />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Bandeau Live (3 états)">
          <TweakRadio
            label="État du bandeau"
            value={tweaks.live_strip_status}
            onChange={v => setTweak('live_strip_status', v)}
            options={[
              { value: 'live',     label: 'Live' },
              { value: 'reveal',   label: 'Reveal' },
              { value: 'upcoming', label: 'Upcoming' },
            ]}
          />
          <p style={{ margin: '10px 0 0', fontSize: '0.78rem', color: 'var(--kopmi-graphite)', lineHeight: 1.5 }}>
            Composant <code style={{ fontFamily: 'var(--font-ace)', fontSize: '0.72rem' }}>{'<KopmiLiveStrip status battle />'}</code>.
            Voir <a href="live-strip-states.html" style={{ color: 'var(--kopmi-crimson)', fontWeight: 700 }}>les 3 états côte à côte</a>.
          </p>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
