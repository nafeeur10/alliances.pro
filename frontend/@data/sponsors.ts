// Tools-and-vendors strip — real brand marks in their official colors,
// served as static SVGs from /public/brands/. Drop-in swap any logo by
// replacing the corresponding file (filename stays the same).

interface Sponsor {
  logo: string; // path under /public, e.g. "/brands/ollama.svg"
  name: string;
}

export const sponsors: Sponsor[] = [
  { logo: "/brands/ollama.svg", name: "Ollama" },
  { logo: "/brands/shadcn.svg", name: "shadcn/ui" },
  { logo: "/brands/digitalocean.svg", name: "Digital Ocean" },
  { logo: "/brands/tailwindcss.svg", name: "Tailwind CSS" },
  { logo: "/brands/laravel.svg", name: "Laravel" },
  { logo: "/brands/lemonsqueezy.svg", name: "Lemon Squeezy" }
];
