import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const groups = [
  { label: "Frontend", items: site.skills.frontend },
  { label: "Backend", items: site.skills.backend },
  { label: "Databases", items: site.skills.databases },
] as const;

export function Skills() {
  return (
    <AnimatedSection id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Skills"
          subtitle="Tools and frameworks in my daily stack"
        />

        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.label} className="terminal-card rounded-sm p-6">
              <h3 className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-sm border border-card-border bg-background px-3 py-1.5 font-mono text-xs text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
