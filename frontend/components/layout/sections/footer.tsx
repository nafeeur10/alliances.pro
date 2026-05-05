import Image from "next/image";
import Link from "next/link";

import {
  footerBlurb,
  footerColumns,
  footerCopyright,
  footerLogo,
  footerNewsletter,
  footerSocial
} from "@/@data/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/layout/logo";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container space-y-4 pb-4 lg:pb-8">
      <div className="bg-muted rounded-2xl border p-10">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-6">
          <div className="col-span-full space-y-4 xl:col-span-2">
            <Logo {...footerLogo} />
            <p className="text-muted-foreground">{footerBlurb}</p>
            <form className="flex w-full max-w-sm gap-2" aria-label="Subscribe to our newsletter">
              <Input
                type="email"
                required
                aria-label="Email address"
                placeholder={footerNewsletter.placeholder}
                className="bg-background/60 h-9"
              />
              <Button type="submit" size="sm" className="h-9 shrink-0">
                {footerNewsletter.ctaLabel}
              </Button>
            </form>
            <p className="text-muted-foreground text-xs">{footerNewsletter.microcopy}</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-2">
              <h3 className="mb-2 text-lg font-bold">{col.heading}</h3>
              {col.links.map((l) => (
                <div key={`${col.heading}-${l.label}`}>
                  <Link href={l.url} className="opacity-60 hover:opacity-100">
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row!">
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm sm:justify-start">
          <span>{footerCopyright()}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          {footerSocial.map((s) => (
            <Button key={s.label} size="icon" variant="ghost" asChild>
              <Link href={s.url} aria-label={s.label}>
                <Image
                  src={s.iconUrl}
                  alt=""
                  aria-hidden
                  width={20}
                  height={20}
                  unoptimized
                  className="size-5"
                />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};
