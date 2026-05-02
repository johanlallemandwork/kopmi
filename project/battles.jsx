/* @jsx React.createElement */
// KOPMI · battles.html — page logic
// Self-contained: shell components are duplicated here so the page does not
// depend on app.jsx (which auto-mounts the homepage).

// ─────────────────── SHELL: LiveStrip / Header / Footer ───────────────────
function KopmiLiveStrip({ status = "live", battle = {} }) {
  const { n = 3, player = "Tchouameni", percent = 41, winner = "ACE", date = "vendredi" } = battle;
  if (status === "reveal") {
    return (
      <div className="live-strip live-strip--reveal">
        <a href="battles.html">
          <span className="live-strip__chip live-strip__chip--reveal">RÉSULTAT</span>
          <span>🏆 Battle {String(n).padStart(2, "0")} : <strong>{winner}</strong> l'emporte avec {percent}% des votes</span>
          <span className="live-strip__cta">→</span>
        </a>
      </div>
    );
  }
  if (status === "upcoming") {
    return (
      <div className="live-strip live-strip--upcoming">
        <a href="battles.html">
          <span className="live-strip__chip live-strip__chip--upcoming">PROCHAINE</span>
          <span>Prochaine battle : <strong>{player}</strong> · {date} à 19h · 3 hymnes en route</span>
          <span className="live-strip__cta">→</span>
        </a>
      </div>
    );
  }
  return (
    <div className="live-strip live-strip--live">
      <a href="battles.html">
        <span className="live-strip__dot"></span>
        <span className="live-strip__chip">LIVE</span>
        <span>Battle {String(n).padStart(2, "0")} {player} · 3 hymnes en compétition · Vote ouvert</span>
        <span className="live-strip__cta">→</span>
      </a>
    </div>
  );
}

const KopmiHeader = ({ active = "battles", cartCount = 2 }) => (
  <header className="k-header">
    <div className="k-header__brand">
      <a href="index.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'inherit', textDecoration: 'none' }}>
        <img src="assets/logo/logo_kopmi.svg" alt="KOPMI" />
        KOPMI
      </a>
    </div>
    <nav className="k-nav">
      <a href="index.html"   className={active === "home"      ? "active" : ""}>Accueil</a>
      <a href="#"            className={active === "shop"      ? "active" : ""}>Boutique</a>
      <a href="#"            className={active === "mascots"   ? "active" : ""}>Mascottes</a>
      <a href="battles.html" className={active === "battles"   ? "active" : ""}>Battles</a>
      <a href="#"            className={active === "pronostic" ? "active" : ""}>Pronostic</a>
    </nav>
    <div className="k-header__icons">
      <button className="k-icon-btn" aria-label="Recherche">⌕</button>
      <button className="k-icon-btn" aria-label="Compte">◔</button>
      <button className="k-icon-btn k-icon-btn--cart" aria-label="Panier" data-count={cartCount}>🛒</button>
    </div>
  </header>
);

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
              <li><a href="battles.html">Battles 10 × 3</a></li>
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

// ─────────────────── DATA ───────────────────
const BATTLES = [
  { n: 1,  player: "Mbappé",     date: "8 juin",     status: "finished", winner: "ACE",   scores: { ACE: 52, BLAZE: 24, RIFF: 24 }, totalVotes: 12483 },
  { n: 2,  player: "Cherki",     date: "11 juin",    status: "finished", winner: "BLAZE", scores: { ACE: 31, BLAZE: 48, RIFF: 21 }, totalVotes: 9621 },
  { n: 3,  player: "Tchouameni", date: "15 juin",    status: "live",     scores: { ACE: 41, BLAZE: 22, RIFF: 37 }, totalVotes: 4821, countdown: "14h 32min" },
  { n: 4,  player: "Saliba",     date: "18 juin",    status: "upcoming", openDate: "18 juin · 19h" },
  { n: 5,  player: "Camavinga",  date: "22 juin",    status: "upcoming", openDate: "22 juin · 19h" },
  { n: 6,  player: "Doué",       date: "26 juin",    status: "upcoming", openDate: "26 juin · 19h" },
  { n: 7,  player: "Maignan",    date: "30 juin",    status: "upcoming", openDate: "30 juin · 19h" },
  { n: 8,  player: "Dembélé",    date: "5 juillet",  status: "upcoming", openDate: "5 juillet · 19h" },
  { n: 9,  player: "Olise",      date: "9 juillet",  status: "upcoming", openDate: "9 juillet · 19h" },
  { n: 10, player: "Koundé",     date: "13 juillet", status: "upcoming", openDate: "13 juillet · 19h", isFinale: true, finaleHint: "Battle décisive · le kop décide qui remporte le trophée KOPMIS" },
];

// ─────────────────── SECTIONS ───────────────────
function PageHero() {
  return (
    <section className="bx-hero" data-screen-label="01 Hero battles">
      <div className="bx-hero__inner">
        <p className="bx-hero__eyebrow">Phase pilote · CDM 2026</p>
        <h1>10 joueurs.<br/>30 hymnes.<br/>1 trophée.</h1>
        <p className="bx-hero__lead">
          Du 8 juin au 13 juillet, dix joueurs des Bleus passent au crible des KOPMIS.
          Trois versions par joueur. Le kop tranche.
        </p>
      </div>
    </section>
  );
}

function ScoreboardGlobal() {
  // Tally finished battles only — true classement provisoire
  const wins = { ACE: 0, BLAZE: 0, RIFF: 0 };
  const winnersOf = { ACE: [], BLAZE: [], RIFF: [] };
  BATTLES.forEach(b => {
    if (b.status === "finished") {
      wins[b.winner]++;
      winnersOf[b.winner].push(b.player);
    }
  });
  const liveBattle = BATTLES.find(b => b.status === "live");

  const Cell = ({ mascot, label, players, modifier }) => (
    <div className={"bx-sc-cell bx-sc--" + modifier}>
      <span className="bx-sc__mascot">{label}</span>
      <span className="bx-sc__num">{wins[mascot]}</span>
      <span className="bx-sc__label">
        {wins[mascot] === 0 ? "Aucune victoire" : (wins[mascot] === 1 ? "Victoire" : "Victoires")}
      </span>
      <span className="bx-sc__detail">
        {players.length === 0 ? "—" : players.join(" · ")}
      </span>
    </div>
  );

  return (
    <>
      <div className="bx-scoreboard-intro">
        <p className="bx-scoreboard-intro__eyebrow">Trophée KOPMIS · classement provisoire</p>
        <p className="bx-scoreboard-intro__sub">
          La mascotte avec le plus de victoires sur 10 battles remporte le <strong>trophée KOPMIS</strong>.
          État au 15 juin · 2 battles jouées sur 10.
        </p>
      </div>
      <section className="bx-scoreboard" data-screen-label="02 Scoreboard global">
        <Cell mascot="ACE"   modifier="ace"   label="ACE · DRILL"   players={winnersOf.ACE} />
        <Cell mascot="BLAZE" modifier="blaze" label="BLAZE · reggae" players={winnersOf.BLAZE} />
        <Cell mascot="RIFF"  modifier="riff"  label="RIFF · ROCK"   players={winnersOf.RIFF} />
        <div className="bx-sc-cell bx-sc--live">
          <span className="bx-sc__chip">EN DIRECT</span>
          <h3 className="bx-sc__title">Battle {String(liveBattle.n).padStart(2,"0")} · <strong>{liveBattle.player}</strong></h3>
          <span className="bx-sc__meta">{liveBattle.totalVotes.toLocaleString('fr-FR')} votes · clôture dans {liveBattle.countdown}</span>
        </div>
      </section>
    </>
  );
}

function Filters({ active, onChange, counts }) {
  const filters = [
    { id: "all",       label: "Toutes",      count: counts.all },
    { id: "upcoming",  label: "À venir",     count: counts.upcoming },
    { id: "live",      label: "En cours",    count: counts.live },
    { id: "finished",  label: "Terminées",   count: counts.finished },
  ];
  return (
    <div className="bx-filters" data-screen-label="03 Filtres">
      <div className="bx-filters__inner">
        {filters.map(f => (
          <button
            key={f.id}
            className={"bx-filter" + (active === f.id ? " bx-filter--active" : "")}
            onClick={() => onChange(f.id)}>
            {f.label} <span className="bx-filter__count">({f.count})</span>
          </button>
        ))}
        <button className="bx-filter bx-filter--ghost" disabled>
          ◔ Mes votes <span className="bx-filter__count">— connectez-vous</span>
        </button>
      </div>
    </div>
  );
}

// Player avatar — placeholder = navy circle with initials
function PlayerAvatar({ name }) {
  const initials = name.split(/[\s'-]+/).map(s => s[0]).slice(0, 2).join("").toUpperCase();
  return <div className="bx-card__photo" aria-hidden="true">{initials}</div>;
}

// Mini score card for one mascot
function MiniScore({ mascot, pct, isWinner, isLeading }) {
  const cls = "bx-mini bx-mini--" + mascot.toLowerCase()
    + (isWinner ? " bx-mini--winner" : "")
    + (isLeading ? " bx-mini--leading" : "");
  return (
    <div className={cls}>
      <span className="bx-mini__name">{mascot}</span>
      <span className="bx-mini__pct">{pct}%</span>
      <div className="bx-mini__bar"><span style={{ width: pct + "%" }}></span></div>
    </div>
  );
}

function BattleCard({ b }) {
  const isLive = b.status === "live";
  const isFinale = b.isFinale;
  const cls = "bx-card"
    + (isLive ? " bx-card--live" : "")
    + (isFinale ? " bx-card--finale" : "");

  return (
    <article className={cls} data-screen-label={`Battle ${String(b.n).padStart(2,"0")}`}>
      <div className="bx-card__num">{String(b.n).padStart(2, "0")}</div>

      <div className="bx-card__player">
        <PlayerAvatar name={b.player} />
        <div className="bx-card__player-info">
          <h3 className="bx-card__name">{b.player}</h3>
          <span className="bx-card__date">{b.date}</span>
        </div>
      </div>

      <div className="bx-card__status">
        {b.status === "upcoming" && (
          <div className="bx-status--upcoming">
            <div className="bx-versions">
              <div className="bx-versions__pills">
                <span className="bx-pill bx-pill--ace"   aria-label="ACE">A</span>
                <span className="bx-pill bx-pill--blaze" aria-label="BLAZE">B</span>
                <span className="bx-pill bx-pill--riff"  aria-label="RIFF">R</span>
              </div>
              <span className="bx-versions__caption">3 versions à venir</span>
            </div>
            <span className="bx-status__hint">
              {b.finaleHint ? <strong>{b.finaleHint}</strong> : <>Vote ouvre le <strong>{b.openDate}</strong></>}
            </span>
          </div>
        )}
        {b.status === "live" && (() => {
          const max = Math.max(b.scores.ACE, b.scores.BLAZE, b.scores.RIFF);
          return (
            <div className="bx-status--live-wrap">
              <div className="bx-status--live">
                <MiniScore mascot="ACE"   pct={b.scores.ACE}   isLeading={b.scores.ACE === max} />
                <MiniScore mascot="BLAZE" pct={b.scores.BLAZE} isLeading={b.scores.BLAZE === max} />
                <MiniScore mascot="RIFF"  pct={b.scores.RIFF}  isLeading={b.scores.RIFF === max} />
              </div>
              <div className="bx-points-hint">
                <strong>+5 pts</strong> par vote · <strong>+25 pts</strong> si tu votes pour la gagnante
              </div>
            </div>
          );
        })()}
        {b.status === "finished" && (
          <div className="bx-status--finished">
            <MiniScore mascot="ACE"   pct={b.scores.ACE}   isWinner={b.winner === "ACE"} />
            <MiniScore mascot="BLAZE" pct={b.scores.BLAZE} isWinner={b.winner === "BLAZE"} />
            <MiniScore mascot="RIFF"  pct={b.scores.RIFF}  isWinner={b.winner === "RIFF"} />
          </div>
        )}
      </div>

      <div className="bx-card__cta">
        {b.status === "upcoming" && (
          <span className="bx-meta-votes">À venir</span>
        )}
        {b.status === "live" && (
          <>
            <button className="bx-cta-vote">VOTER</button>
            <span className="bx-meta-countdown">⏱ {b.countdown} restant</span>
            <span className="bx-meta-votes">{b.totalVotes.toLocaleString('fr-FR')} votes</span>
          </>
        )}
        {b.status === "finished" && (
          <>
            <button className="bx-cta-replay">Réécouter les 3 hymnes →</button>
            <span className="bx-meta-votes">{b.totalVotes.toLocaleString('fr-FR')} votes</span>
          </>
        )}
      </div>
    </article>
  );
}

function BattlesList({ filter }) {
  const list = filter === "all" ? BATTLES : BATTLES.filter(b => b.status === filter);
  return (
    <section className="bx-list" data-screen-label="04 Liste battles">
      <div className="bx-list__inner">
        {list.map(b => <BattleCard key={b.n} b={b} />)}
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="bx-cta-band" data-screen-label="05 CTA inscription">
      <div className="bx-cta-band__inner">
        <p className="bx-cta-band__eyebrow">Pas encore inscrit ?</p>
        <h2>Cumule des points à chaque action.</h2>
        <p className="bx-cta-band__sub">
          Vote, partage, pronostique, achète. Plus tu participes, plus tu multiplies tes chances
          aux 3 tirages :
        </p>
        <ul className="bx-cta-band__draws">
          <li><strong>Express</strong><span>chaque semaine</span></li>
          <li><strong>Premium</strong><span>chaque dimanche</span></li>
          <li><strong>Grand Tirage</strong><span>14 juillet · 10 maillots Bleus floqués</span></li>
        </ul>
        <button className="btn btn--gold btn--lg">Créer mon compte →</button>
        <p className="bx-cta-band__legal">
          Participation gratuite. Voie d'accès gratuite via formulaire pronostic. Règlement déposé chez Maître [Nom].
        </p>
      </div>
    </section>
  );
}

// ─────────────────── APP ───────────────────
function App() {
  const [filter, setFilter] = React.useState("all");
  const counts = {
    all:      BATTLES.length,
    upcoming: BATTLES.filter(b => b.status === "upcoming").length,
    live:     BATTLES.filter(b => b.status === "live").length,
    finished: BATTLES.filter(b => b.status === "finished").length,
  };
  const liveBattle = BATTLES.find(b => b.status === "live");

  return (
    <>
      <KopmiLiveStrip
        status="live"
        battle={{ n: liveBattle.n, player: liveBattle.player, percent: liveBattle.scores.ACE }}
      />
      <KopmiHeader active="battles" />
      <main>
        <PageHero />
        <ScoreboardGlobal />
        <Filters active={filter} onChange={setFilter} counts={counts} />
        <BattlesList filter={filter} />
        <CtaBand />
      </main>
      <KopmiFooter />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
