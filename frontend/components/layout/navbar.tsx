"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu } from "lucide-react";

import Icon from "@/components/icon";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Logo, { type LogoProps } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleTheme } from "@/components/layout/toogle-theme";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

export interface NavRoute {
  href: string;
  label: string;
}

export interface NavResourceItem {
  title: string;
  href: string;
  icon?: string;
  gradient?: string;
  description?: string;
}

export interface NavResourceGroup {
  label: string;
  items: NavResourceItem[];
}

export interface NavResourceFeatured {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  cta: string;
}

export interface NavCta {
  label: string;
  url: string;
}

export interface NavbarProps {
  logo: LogoProps;
  routes: NavRoute[];
  resourceGroups: NavResourceGroup[];
  resourceFeatured?: NavResourceFeatured;
  loginCta: NavCta;
  signupCta: NavCta;
}

// Soft light-gray hover used everywhere on the navbar — theme-aware so it
// reads as light gray in light mode and a subtle dark gray in dark mode.
const HOVER = "hover:bg-gray-200 dark:hover:bg-zinc-800/60 transition-colors";
const HOVER_OPEN = "data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-zinc-800/60";

function ResourceIcon({ item }: { item: NavResourceItem }) {
  if (!item.icon) return null;
  return (
    <span
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm",
        item.gradient ?? "from-sky-500 to-indigo-500"
      )}
    >
      <Icon name={item.icon} className="h-4 w-4 text-white" />
    </span>
  );
}

export const Navbar = ({
  logo,
  routes,
  resourceGroups,
  resourceFeatured,
  loginCta,
  signupCta
}: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  // "Scrolled" = the 8px marker at the top of the page has left the viewport.
  // An observer avoids reading window.scrollY, which forced a layout on load.
  const topMarkerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const marker = topMarkerRef.current;
    if (!marker) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(marker);
    return () => io.disconnect();
  }, []);

  const firstRoute = routes[0];
  const restRoutes = routes.slice(1);

  return (
    <>
      <div
        ref={topMarkerRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-2 w-px"
      />
      <header
        className={cn(
          "sticky z-40 transition-[top] duration-300",
          scrolled ? "top-0" : "top-2 lg:top-5"
        )}
      >
        <div
          className={cn(
            "transition-all duration-300",
            scrolled ? "bg-background/80 w-full border-b shadow-sm backdrop-blur-md" : "container"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              scrolled
                ? "container mx-auto px-4 py-3"
                : "bg-background/70 rounded-2xl border p-3 backdrop-blur-sm"
            )}
          >
            <Logo {...logo} />

            {/* Mobile */}
            <div className="flex items-center lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="flex size-10 cursor-pointer items-center justify-center rounded-md lg:hidden"
                  >
                    <Menu aria-hidden />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="bg-card border-secondary flex flex-col justify-between overflow-y-auto rounded-tr-2xl rounded-br-2xl"
                >
                  <div>
                    <SheetHeader className="mb-4 ml-4">
                      <SheetTitle className="flex items-center">
                        <Logo {...logo} />
                      </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-1">
                      {firstRoute ? (
                        <Button
                          key={firstRoute.href}
                          onClick={() => setIsOpen(false)}
                          asChild
                          variant="ghost"
                          className={cn("justify-start text-base", HOVER)}
                        >
                          <Link href={firstRoute.href}>{firstRoute.label}</Link>
                        </Button>
                      ) : null}

                      {restRoutes.map(({ href, label }) => (
                        <Button
                          key={href}
                          onClick={() => setIsOpen(false)}
                          asChild
                          variant="ghost"
                          className={cn("justify-start text-base", HOVER)}
                        >
                          <Link href={href}>{label}</Link>
                        </Button>
                      ))}

                      {resourceGroups.map((group) => (
                        <div key={group.label} className="mt-2 px-4">
                          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                            {group.label}
                          </p>
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={cn("-mx-2 flex items-center gap-3 rounded-md p-2", HOVER)}
                            >
                              <ResourceIcon item={item} />
                              <span className="text-base">{item.title}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <SheetFooter className="flex-col items-start justify-start sm:flex-col">
                    <Separator className="mb-2" />
                    <ToggleTheme />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop */}
            {/* viewport={false}: the shared viewport is positioned at the menu
              root's left edge, which opened the panel under the first item
              instead of under Resources. Without it each content renders
              inside its own (relative) item — see the centring below. */}
            <NavigationMenu viewport={false} className="mx-auto hidden lg:block">
              <NavigationMenuList className="space-x-0">
                {firstRoute ? (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent!",
                        HOVER,
                        "hover:bg-gray-200! dark:hover:bg-zinc-800/60!"
                      )}
                    >
                      <Link href={firstRoute.href}>{firstRoute.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : null}

                {restRoutes.map(({ href, label }) => (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent!",
                        "transition-colors hover:bg-gray-200! dark:hover:bg-zinc-800/60!"
                      )}
                    >
                      <Link href={href}>{label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {resourceGroups.length > 0 ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent!",
                        HOVER_OPEN,
                        "hover:bg-gray-200! dark:hover:bg-zinc-800/60!"
                      )}
                    >
                      Resources
                    </NavigationMenuTrigger>
                    {/* Centred on its trigger rather than left-aligned to it. */}
                    <NavigationMenuContent className="left-1/2! -translate-x-1/2">
                      {/* Narrower below xl so the centred panel stays on screen at 1024px. */}
                      <div className="flex w-[680px] gap-2 p-3 xl:w-[820px]">
                        {resourceGroups.map((group) => (
                          <div key={group.label} className="w-52 shrink-0 xl:w-60">
                            <p className="text-muted-foreground px-2 pt-1 pb-2 text-xs font-semibold tracking-widest uppercase">
                              {group.label}
                            </p>
                            <ul className="flex flex-col gap-1">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        "flex flex-row items-start gap-3 rounded-md p-2",
                                        HOVER
                                      )}
                                    >
                                      <ResourceIcon item={item} />
                                      <span className="flex flex-col">
                                        <span className="text-sm font-medium">{item.title}</span>
                                        {item.description ? (
                                          <span className="text-muted-foreground text-xs">
                                            {item.description}
                                          </span>
                                        ) : null}
                                      </span>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {resourceFeatured ? (
                          <NavigationMenuLink asChild>
                            <Link
                              href={resourceFeatured.href}
                              className="group/featured bg-muted/50 hover:bg-muted ml-auto flex w-56 shrink-0 flex-col gap-0! overflow-hidden rounded-lg border p-0! transition-colors xl:w-72"
                            >
                              <span className="relative block aspect-[16/9] w-full overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={resourceFeatured.image}
                                  alt=""
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover/featured:scale-[1.03]"
                                />
                              </span>
                              <span className="flex flex-col gap-1 p-3">
                                <span className="text-primary text-[11px] font-semibold tracking-widest uppercase">
                                  {resourceFeatured.eyebrow}
                                </span>
                                <span className="text-sm font-semibold">
                                  {resourceFeatured.title}
                                </span>
                                <span className="text-muted-foreground text-xs leading-relaxed">
                                  {resourceFeatured.description}
                                </span>
                                <span className="text-foreground mt-1 inline-flex items-center gap-1 text-xs font-medium">
                                  {resourceFeatured.cta}
                                  <ArrowRight className="size-3.5 transition-transform group-hover/featured:translate-x-0.5" />
                                </span>
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        ) : null}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : null}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden items-center lg:flex">
              <div className="flex gap-2">
                <Button asChild size="lg" variant="ghost" className={HOVER}>
                  <Link href={loginCta.url}>{loginCta.label}</Link>
                </Button>
                <Button asChild size="lg">
                  <Link href={signupCta.url}>{signupCta.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
