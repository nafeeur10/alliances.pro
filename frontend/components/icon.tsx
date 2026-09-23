import React from "react";
import {
  BadgeCheck,
  BookOpen,
  Contact,
  Database,
  EyeOff,
  FolderKanban,
  Handshake,
  History,
  KeyRound,
  Layers,
  LifeBuoy,
  ListTodo,
  Map as MapIcon,
  MonitorCheck,
  Newspaper,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  SunDim,
  TrendingUp,
  Workflow
} from "lucide-react";

type IconProps = {
  name: string;
  className?: string;
};

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Only the icons @data/* names. Importing lucide's whole `icons` object here
// shipped every icon (~450 KB) to every page; add a name below when you use a
// new one in the data files.
const iconMap: Record<string, IconType> = {
  BadgeCheck,
  BookOpen,
  Contact,
  Database,
  EyeOff,
  FolderKanban,
  Handshake,
  History,
  KeyRound,
  Layers,
  LifeBuoy,
  ListTodo,
  Map: MapIcon,
  MonitorCheck,
  Newspaper,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  SunDim,
  TrendingUp,
  Workflow
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] "${name}" is not in the icon map in components/icon.tsx`);
    }
    return null;
  }

  return <LucideIcon className={className} />;
};

export default Icon;
