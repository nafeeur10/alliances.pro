interface TrustPointProps {
  icon: string;
  problem: string;
  solution: string;
  badge: string;
}

export const trustPointList: TrustPointProps[] = [
  {
    icon: "MonitorCheck",
    badge: "Production-Grade",
    problem: "Looks finished — but isn't production-ready.",
    solution: "Not just a polished UI — a production-grade system built to handle real workloads."
  },
  {
    icon: "Database",
    badge: "Data Isolation",
    problem: "One user can see another user's data.",
    solution: "Strict data isolation — your data is yours. Always. No exceptions."
  },
  {
    icon: "KeyRound",
    badge: "Permissions",
    problem: "Who can see what? Nobody knows.",
    solution: "Granular permissions — control exactly who sees what, down to every field."
  },
  {
    icon: "Layers",
    badge: "Architecture",
    problem: "Stitched-together logic with no real system design.",
    solution: "Built with system design in mind — not patched together under pressure."
  },
  {
    icon: "BadgeCheck",
    badge: "Reliability",
    problem: "'It should work' engineering with no real validation.",
    solution: "Designed to not fail — every path is validated, not just assumed."
  },
  {
    icon: "ShieldAlert",
    badge: "Edge Cases",
    problem: "Works at first, breaks later in edge cases.",
    solution: "Handles edge cases before they become disasters — tested beyond the happy path."
  },
  {
    icon: "EyeOff",
    badge: "Zero Leakage",
    problem: "Cross-account data exposure — the most dangerous flaw.",
    solution: "Zero cross-account data leakage. Guaranteed by architecture, not convention."
  },
  {
    icon: "Workflow",
    badge: "Automation",
    problem: "Automations run silently — and silently go wrong.",
    solution: "Reliable workflows you can trust — every trigger, every time, every output."
  },
  {
    icon: "Handshake",
    badge: "Trust First",
    problem: "Everyone ships features. Nobody builds a foundation.",
    solution: "CRM isn't about features — it's about trust. We build the foundation first."
  },
  {
    icon: "TrendingUp",
    badge: "Long-term",
    problem: "Great for demos. Falls apart at scale.",
    solution: "Built for long-term reliability — scales with your business, not just your pitch."
  }
];
