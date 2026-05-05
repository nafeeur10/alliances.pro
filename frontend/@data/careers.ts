// Open roles at Alliances PRO. Edit this list when a role opens or closes.

export interface CareerRole {
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  applyUrl: string;
}

export const openRoles: CareerRole[] = [
  // Empty for now — the page renders an empty state with a "drop your email" form.
];

export const careersIntro = {
  eyebrow: "Careers",
  headline: "Build the CRM small teams actually like.",
  subheading:
    "We're a small, distributed team obsessed with shipping. We hire writers, designers, and engineers who care about craft and want to own the outcome of what they ship."
};
