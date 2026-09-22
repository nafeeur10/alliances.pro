import Image from "next/image";
import type { ReactNode } from "react";

import { authorInitials } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Sticky left rail shared by blog posts and docs: one card holding the author,
 * the content index and whatever else the page hangs off it. It scrolls
 * internally when its contents outgrow the viewport, so a long index never
 * pushes the share row out of reach.
 */
export function ArticleRail({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <aside className={cn("lg:sticky lg:top-24 lg:self-start", className)}>
      <div className="bg-background/60 rounded-2xl border p-5 backdrop-blur-sm lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
        {children}
      </div>
    </aside>
  );
}

export function RailSeparator({ className }: { className?: string }) {
  return <hr className={cn("border-border/70 my-4", className)} />;
}

/** Who wrote it — the first thing in the rail, above the content index. */
export function RailAuthor({
  name,
  role,
  avatar
}: {
  name: string;
  role: string;
  avatar?: string;
}) {
  return (
    <div className="flex items-center gap-3.5">
      {avatar ? (
        <Image
          src={avatar}
          alt=""
          width={52}
          height={52}
          className="ring-border size-13 shrink-0 rounded-full object-cover ring-1 ring-offset-2 ring-offset-white dark:ring-offset-transparent"
        />
      ) : (
        <span className="flex size-13 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
          {authorInitials(name)}
        </span>
      )}
      <div className="min-w-0 leading-tight">
        <div className="text-foreground truncate text-[15px] font-semibold tracking-tight">
          {name}
        </div>
        <div className="text-muted-foreground mt-0.5 truncate text-[13px]">{role}</div>
      </div>
    </div>
  );
}

export function RailLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-widest uppercase">
      {children}
    </p>
  );
}
