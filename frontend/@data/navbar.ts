interface RouteProps {
  href: string;
  label: string;
}

interface ProductProps {
  title: string;
  icon: string;
  description: string;
}

export const routeList: RouteProps[] = [
  {
    href: "#solutions",
    label: "Solutions",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];

export const productList: ProductProps[] = [
  {
    title: "Client Hub",
    icon: "Users",
    description: "Centralized platform for all client interactions.",
  },
  {
    title: "Project Manager",
    icon: "FolderKanban",
    description: "Track and deliver projects on time, every time.",
  },
  {
    title: "Analytics Suite",
    icon: "ChartScatter",
    description: "Powerful insights to grow your service business.",
  },
];
