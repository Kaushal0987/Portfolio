import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="border-t border-card-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Experience"
          subtitle="Where I've been building and learning"
        />

        <div className="space-y-6">
          {site.experience.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              className="terminal-card rounded-sm p-6 sm:p-8"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.role}
                  </h3>
                  <p className="font-mono text-sm text-accent">{job.company}</p>
                </div>
                <p className="shrink-0 font-mono text-xs text-muted">
                  {job.period}
                </p>
              </div>
              <ul className="mt-5 space-y-2">
                {job.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="shrink-0 font-mono text-accent" aria-hidden="true">
                      &gt;
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
