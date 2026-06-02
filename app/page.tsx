import { projects, type Project } from "./projects";

const STATUS_META: Record<
  Project["status"],
  { badgeText: string; badgeClass: string; ctaLead: string; ctaAction: string; playable: boolean }
> = {
  live: {
    badgeText: "LIVE",
    badgeClass: "is-live",
    ctaLead: "READY",
    ctaAction: "▸ PLAY",
    playable: true,
  },
  "in-progress": {
    badgeText: "IN PROGRESS",
    badgeClass: "is-progress",
    ctaLead: "BUILDING",
    ctaAction: "▸ CONTINUE",
    playable: true,
  },
  "coming-soon": {
    badgeText: "COMING SOON",
    badgeClass: "is-soon",
    ctaLead: "STANDBY",
    ctaAction: "◌ SOON",
    playable: false,
  },
};

function Cabinet({ project }: { project: Project }) {
  const meta = STATUS_META[project.status];
  const classes = [
    "cab",
    meta.playable ? "is-playable" : "",
    project.status === "live" ? "is-live" : "",
    project.status === "in-progress" ? "is-progress" : "",
    project.status === "coming-soon" ? "is-soon" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = { ["--c" as string]: project.accent };
  const inner = (
    <>
      <div className="cab-screen">
        <span className={`cab-badge ${meta.badgeClass}`}>{meta.badgeText}</span>
        <span className="cab-glyph">{project.emoji}</span>
      </div>
      <h2 className="cab-name">{project.title}</h2>
      <p className="cab-desc">{project.description}</p>
      <div className="cab-cta">
        <span>{meta.ctaLead}</span>
        <span className="cab-arrow">{meta.ctaAction}</span>
      </div>
    </>
  );

  if (!meta.playable) {
    return (
      <div className={classes} style={style} aria-label={`${project.title} — coming soon`}>
        {inner}
      </div>
    );
  }

  return (
    <a href={project.href} className={classes} style={style}>
      {inner}
    </a>
  );
}

export default function Home() {
  const total = projects.length;
  const nowPlaying = projects.filter((p) => p.status === "live").length;

  return (
    <>
      <div className="arcade-floor" />
      <div className="arcade-vignette" />

      <main className="mx-auto max-w-5xl px-6 pb-32 pt-16 sm:pt-24">
        <header className="mb-12 text-center sm:mb-16">
          <h1 className="arcade-title">
            TRE&apos;S <span className="accent">ARCADE</span>
          </h1>
          <p className="arcade-subtitle">
            A high-score collection of personal builds. Pick a cabinet and press play.
          </p>
          <div className="arcade-meta">
            <span>
              <b>{total}</b> CABINETS
            </span>
            <span>
              <b>{nowPlaying}</b> NOW PLAYING
            </span>
            <span>PLAYER&nbsp;1 · TRE</span>
          </div>
        </header>

        <section className="arcade-grid" aria-label="Projects">
          {projects.map((project) => (
            <Cabinet key={project.href} project={project} />
          ))}
        </section>

        <footer className="arcade-footer">
          <div>© {new Date().getFullYear()} TRE · BUILT FOR FUN</div>
          <div className="pulse">▮▮▮ GAME ON ▮▮▮</div>
        </footer>
      </main>

      <div className="arcade-crt" />
    </>
  );
}
