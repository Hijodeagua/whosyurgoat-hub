export type ProjectStatus = "live" | "in-progress" | "coming-soon";

export type Project = {
  title: string;
  description: string;
  href: string;
  status: ProjectStatus;
};

// To add a new project: add an entry here AND a matching rewrite in vercel.json.
// The `href` must match the rewrite `source` subpath.
export const projects: Project[] = [
  {
    title: "Who's Yur GOAT",
    description: "NBA GOAT head-to-head voting.",
    href: "/goat",
    status: "live",
  },
  {
    title: "Crime Maps",
    description: "Charlotte crime data, interactive maps.",
    href: "/crime-maps",
    status: "coming-soon",
  },
  {
    title: "Election Tracker",
    description: "Polling averages & trends.",
    href: "/election",
    status: "in-progress",
  },
  {
    title: "Can Tre Beat Vegas",
    description: "NFL/NBA model picks vs. the spread.",
    href: "/vegas",
    status: "in-progress",
  },
  {
    title: "World Cup 2026",
    description: "Match & ticket tracker.",
    href: "/worldcup",
    status: "coming-soon",
  },
];
