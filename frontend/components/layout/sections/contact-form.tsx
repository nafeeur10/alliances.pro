"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const formSchema = z.object({
  firstName: z.string().trim().min(1).max(20),
  lastName: z.string().trim().min(1).max(20),
  email: z.string().email(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(2).max(2000)
});

type FormValues = z.infer<typeof formSchema>;
type Status = "idle" | "submitting" | "success" | "error";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api/v1/marketing";
const RECAPTCHA_PLACEHOLDER = "dev-noop";

interface Props {
  contactEmail: string;
}

export const ContactForm = ({ contactEmail: _contactEmail }: Props) => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", subject: "", message: "" }
  });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMsg(null);

    const fullName = `${values.firstName} ${values.lastName}`.trim();
    const message = `Subject: ${values.subject}\n\n${values.message}`;

    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          source: "contact_form",
          name: fullName,
          email: values.email,
          message,
          consent_given: true,
          recaptcha_token: RECAPTCHA_PLACEHOLDER,
          page_url: typeof window !== "undefined" ? window.location.href : undefined
        })
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { message?: string; errors?: Record<string, string[]> }
          | null;
        const firstError =
          data?.errors && Object.values(data.errors)[0] ? Object.values(data.errors)[0]?.[0] : null;
        setErrorMsg(firstError ?? data?.message ?? "Submission failed. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("contact_submitted", { subject: values.subject });
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="bg-muted">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Check className="size-6" aria-hidden strokeWidth={2.5} />
          </div>
          <h3 className="text-foreground text-xl font-semibold">Message sent</h3>
          <p className="text-muted-foreground max-w-sm text-sm">
            Thanks — we got it. The team will reply to you within one business day.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => setStatus("idle")}
          >
            Send another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>Send Message</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-6">
            <div className="flex flex-col gap-6 md:flex-row!">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full gap-4">
                    <FormLabel className="font-semibold">First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your first name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full gap-4">
                    <FormLabel className="font-semibold">Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your last name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel className="font-semibold">Subject</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Demo">Demo request</SelectItem>
                      <SelectItem value="Feature request">Feature request</SelectItem>
                      <SelectItem value="Bug report">Bug report</SelectItem>
                      <SelectItem value="Press">Press</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel className="font-semibold">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Your message..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {errorMsg ? (
              <p className="text-sm text-rose-600 dark:text-rose-400">{errorMsg}</p>
            ) : null}

            <Button size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                "Send message"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
