"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatedSection
      id="projects"
      className="border-t border-card-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Projects"
          subtitle="Selected work — fullstack apps, e-commerce, CMS, and security tools"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {site.projects.map((project, index) => {
            const Card = reduceMotion ? "article" : motion.article;

            const motionProps = reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: index * 0.06 },
                };

            return (
              <Card
                key={project.title}
                {...motionProps}
                className="terminal-card group flex flex-col rounded-sm p-6"
              >
                <span className="mb-4 block font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-card-border px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-5 flex gap-4 border-t border-card-border pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover"
                      >
                        Live →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
