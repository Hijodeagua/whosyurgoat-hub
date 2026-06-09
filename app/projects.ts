export type ProjectStatus = "live" | "in-progress" | "coming-soon";

export type Project = {
  title: string;
  description: string;
  href: string;
  status: ProjectStatus;
  /** Bold emoji glyph shown on the cabinet screen. */
  emoji: string;
  /** Neon accent color (hex) used for glow, border and CTA. */
  accent: string;
};

// To add a new project: add an entry here AND a matching rewrite in vercel.json.
// The `href` must match the rewrite `source` subpath.
// NOTE: keep this list in sync with the rewrites in vercel.json — every `href`
// here must have a corresponding rewrite there, and vice versa.
export const projects: Project[] = [
  {
    title: "Who's Yur GOAT",
    description: "NBA GOAT head-to-head voting.",
    href: "/goat",
    status: "live",
    emoji: "🐐",
    accent: "#ffd23f",
  },
  {
    title: "World Cup 2026",
    description: "Match & ticket tracker.",
    href: "/worldcup",
    status: "live",
    emoji: "⚽",
    accent: "#c66bff",
  },
  {
    title: "Pooppyhead Detector",
    description: "AI fact-checks any claim on a 1–10 💩 scale.",
    href: "/poop",
    status: "in-progress",
    emoji: "💩",
    accent: "#b5803a",
  },
  {
    title: "Election Tracker",
    description:
      "Trump approval comparisons, Senate race trackers with market odds, and a Senate control simulation.",
    href: "/election",
    status: "coming-soon",
    emoji: "🗳️",
    accent: "#4da3ff",
  },
  {
    title: "Can Tre Beat Vegas",
    description: "NFL/NBA model picks vs. the spread.",
    href: "/vegas",
    status: "coming-soon",
    emoji: "🎰",
    accent: "#3ddc84",
  },
  {
    title: "Crime Maps",
    description: "Charlotte crime data, interactive maps.",
    href: "/crime-maps",
    status: "coming-soon",
    emoji: "🗺️",
    accent: "#ff4d6d",
  },
];
