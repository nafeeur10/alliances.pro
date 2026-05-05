import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  footerBlurb,
  footerColumns,
  footerCopyright,
  footerLogo,
  footerSocial
} from "@/@data/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import Logo from "@/components/layout/logo";

import { FooterNewsletterForm } from "./footer-newsletter-form";

export const FooterSection = () => {
  return (
    <>
      <footer id="footer" className="container space-y-4 pb-4 lg:pb-8">
        <div className="relative">
          {/* Newsletter — half outside / half inside, centered */}
          <div className="absolute inset-x-0 top-0 z-10 flex -translate-y-1/2 justify-center px-4">
            <div className="w-full max-w-md">
              <FooterNewsletterForm />
            </div>
          </div>

          <div className="bg-muted relative rounded-2xl border p-10 pt-20">
            {/* Decorative gradient blob, clipped to card corners */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
              aria-hidden
            >
              <div className="from-primary/20 absolute -top-24 -right-24 size-72 rounded-full bg-gradient-to-br to-transparent blur-3xl" />
            </div>

            <div className="relative grid grid-cols-2 gap-x-12 gap-y-8 md:grid-cols-4 xl:grid-cols-6">
              <div className="col-span-full space-y-4 xl:col-span-2">
                <Logo {...footerLogo} />
                <p className="text-muted-foreground">{footerBlurb}</p>
              </div>

              {footerColumns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-2">
                  <h3 className="mb-2 text-lg font-bold">{col.heading}</h3>
                  {col.links.map((l) => (
                    <Link
                      key={`${col.heading}-${l.label}`}
                      href={l.url}
                      className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5 text-sm transition-colors"
                    >
                      <ArrowRight
                        aria-hidden
                        className="text-primary/70 group-hover:text-primary size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                      <span>{l.label}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:justify-start">
            <span>{footerCopyright()}</span>
            <span className="bg-border hidden h-4 w-px sm:inline-block" aria-hidden />
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>All systems operational</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            {footerSocial.map((s) => (
              <Link
                key={s.label}
                href={s.url}
                aria-label={s.label}
                className="hover:bg-background/60 hover:border-primary/40 flex size-9 items-center justify-center rounded-full border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
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
            ))}
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
};
