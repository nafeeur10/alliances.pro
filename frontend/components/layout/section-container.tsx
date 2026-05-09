import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionContainer({ children, id, className }: Props) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <div className="container">{children}</div>
    </section>
  );
}
