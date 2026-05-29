import { projects, type Project } from "./projects";

const STATUS_STYLES: Record<
  Project["status"],
  { label: string; badge: string; dot: string }
> = {
  live: {
    label: "Live",
    badge: "bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30",
    dot: "bg-emerald-400",
  },
  "in-progress": {
    label: "In Progress",
    badge: "bg-sky-500/15 text-sky-400 ring-1 ring-inset ring-sky-500/30",
    dot: "bg-sky-400",
  },
  "coming-soon": {
    label: "Coming Soon",
    badge: "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30",
    dot: "bg-amber-400",
  },
};

function StatusBadge({ status }: { status: Project["status"] }) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium " +
        style.badge
      }
    >
      <span className={"h-1.5 w-1.5 rounded-full " + style.dot} />
      {style.label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      className="group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition hover:border-neutral-600 hover:bg-neutral-900"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-neutral-100">
            {project.title}
          </h2>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-2 text-sm text-neutral-400">{project.description}</p>
      </div>
      <div className="mt-6 text-sm font-medium text-neutral-500 transition group-hover:text-neutral-300">
        {project.href}
        <span className="ml-1 inline-block transition group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Who&apos;s Yur GOAT
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-400">
          A directory of my projects, all under one roof.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.href} project={project} />
        ))}
      </div>

      <footer className="mt-20 text-sm text-neutral-600">
        whosyurgoat.app
      </footer>
    </main>
  );
}
