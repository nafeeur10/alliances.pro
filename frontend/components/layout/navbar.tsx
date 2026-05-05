"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

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
  description?: string;
}

export interface NavResourceGroup {
  label: string;
  items: NavResourceItem[];
}

export interface NavCta {
  label: string;
  url: string;
}

export interface NavbarProps {
  logo: LogoProps;
  routes: NavRoute[];
  resourceGroups: NavResourceGroup[];
  loginCta: NavCta;
  signupCta: NavCta;
}

// Soft light-gray hover used everywhere on the navbar — theme-aware so it
// reads as light gray in light mode and a subtle dark gray in dark mode.
const HOVER = "hover:bg-gray-200 dark:hover:bg-zinc-800/60 transition-colors";
const HOVER_OPEN = "data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-zinc-800/60";

export const Navbar = ({ logo, routes, resourceGroups, loginCta, signupCta }: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On non-home pages the "#blog" anchor would dead-link, so route it to the
  // full blog index instead. Other anchors (#benefits, #features) stay as-is
  // since the user asked for this only for Blogs.
  const resolvedRoutes = routes.map((r) =>
    r.href === "#blog" && !isHome ? { ...r, href: "/blog" } : r
  );

  const firstRoute = resolvedRoutes[0];
  const restRoutes = resolvedRoutes.slice(1);

  return (
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
                <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer lg:hidden" />
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
          <NavigationMenu className="mx-auto hidden lg:block">
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
  );
};
