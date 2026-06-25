import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = {
  globe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  layout: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  layers: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12.83 2.18 8 3.33a1 1 0 0 1 0 1.84l-8 3.33a2 2 0 0 1-1.66 0l-8-3.33a1 1 0 0 1 0-1.84l8-3.33a2 2 0 0 1 1.66 0Z" />
      <path d="m2 12 10 4 10-4" />
      <path d="m2 17 10 4 10-4" />
    </svg>
  ),
};

export function Services() {
  return (
    <AnimatedSection id="services" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Services"
          subtitle="What I can build for you as a freelancer"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => (
            <article
              key={service.title}
              className="terminal-card rounded-sm p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-accent/30 bg-accent-muted text-accent">
                  {icons[service.icon]}
                </div>
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
