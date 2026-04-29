import { SunDimIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" aria-label="Alliances PRO home" className="flex font-bold items-center">
      <span
        aria-hidden
        className="flex items-center justify-center size-7 lg:size-8 mr-2 bg-linear-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary"
      >
        <SunDimIcon className="size-5 lg:size-6 text-white" />
      </span>
      <span className="text-lg lg:text-xl">Alliances PRO</span>
    </Link>
  );
}
