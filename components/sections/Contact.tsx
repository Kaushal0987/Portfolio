"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-sm border border-card-border bg-background px-4 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent";

export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setState("success");
      form.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  return (
    <AnimatedSection
      id="contact"
      className="border-t border-card-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Contact"
          subtitle="Have a project in mind? Send a message — I reply within 24 hours."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-6 lg:col-span-2">
            <div className="terminal-card rounded-sm p-6 font-mono text-sm">
              <p className="text-muted">
                <span className="text-accent">$</span> cat contact.txt
              </p>
              <p className="mt-3 text-foreground">{site.email}</p>
              <p className="mt-1 text-muted">{site.location}</p>
            </div>

            <div className="flex flex-col gap-2">
              {site.social.github && (
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
                >
                  GitHub →
                </a>
              )}
              {site.social.whatsapp && (
                <a
                  href={site.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
                >
                  WhatsApp →
                </a>
              )}
              {site.social.linkedin && (
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative space-y-5 lg:col-span-3"
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="your_name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="// tell me about your project..."
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              className="w-full rounded-sm border border-accent bg-accent/10 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-accent transition-all hover:bg-accent hover:text-background disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {state === "loading" ? "Sending..." : "Send Message →"}
            </button>

            {state === "success" && (
              <p
                role="status"
                className="font-mono text-sm text-accent"
              >
                ✓ Message sent — I&apos;ll be in touch soon.
              </p>
            )}
            {state === "error" && (
              <p role="alert" className="font-mono text-sm text-red-400">
                ✗ {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
