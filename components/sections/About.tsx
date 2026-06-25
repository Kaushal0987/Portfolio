import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter, StatText } from "@/components/ui/StatCounter";

export function About() {
  return (
    <AnimatedSection
      id="about"
      className="border-t border-card-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading title="About" />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-6 lg:col-span-3">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {site.bio}
            </p>
            <p className="text-sm leading-relaxed text-muted">{site.aboutDetail}</p>

            <div>
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-foreground">
                What I Build
              </h3>
              <ul className="space-y-2">
                {site.whatIBuild.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 font-mono text-sm text-muted"
                  >
                    <span className="shrink-0 text-accent" aria-hidden="true">
                      &gt;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-mono text-xs text-muted">
              Graduating 2026 · Response time under 24 hours
            </p>

            <div className="flex flex-wrap gap-2">
              {site.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-sm border border-card-border bg-card px-3 py-1 font-mono text-xs text-muted"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8 lg:col-span-2">
            <div className="terminal-card flex aspect-square max-w-xs items-center justify-center rounded-sm mx-auto lg:mx-0 lg:ml-auto">
              <div className="text-center">
                <span className="font-mono text-6xl font-bold text-accent">
                  {site.name.charAt(0)}
                </span>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
                  {site.tagline}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <StatCounter value={site.stats.projects} label="Projects" />
              <StatCounter value={site.stats.clients} label="Clients" />
              <StatCounter value={site.stats.months} label="Months" suffix="+" />
              <StatText value={site.stats.response} label="Response" />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
