"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactForm = dynamic(() => import("./contact-form").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <FormSkeleton />
});

/**
 * The contact form pulls in react-hook-form + zod (~48 KB) for a form that
 * sits at the bottom of the page. Mount it when it comes within range instead
 * of during the initial load. The skeleton reserves the form's real height
 * (524px desktop, 614px mobile) so nothing shifts when it swaps in.
 */
function FormSkeleton() {
  return (
    <Card className="bg-muted/60 h-[614px] animate-pulse md:h-[524px]">
      <CardHeader className="text-primary text-2xl font-semibold">
        <CardTitle>Contact form</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-background/70 h-11 w-full rounded-md" />
        ))}
        <div className="bg-background/70 h-24 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

export function ContactFormLazy({ contactEmail }: { contactEmail: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>{show ? <ContactForm contactEmail={contactEmail} /> : <FormSkeleton />}</div>
  );
}
