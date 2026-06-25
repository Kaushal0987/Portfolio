import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <AnimatedSection
      id="about"
      className="border-t border-card-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading title="About" />

        <div className="max-w-3xl space-y-6">
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
      </div>
    </AnimatedSection>
  );
}
