import { site } from "@/data/site";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { StatusBar } from "@/components/ui/StatusBar";

export function Hero() {
  return (
    <AnimatedSection className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-6 py-16 sm:py-24">
      <StatusBar />

      <h1 className="mt-10 text-5xl font-bold uppercase leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
        {site.name.split(" ").map((word, i) => (
          <span key={word} className={i === 0 ? "block" : "block text-accent"}>
            {word}
          </span>
        ))}
      </h1>

      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {site.heroHeadline}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="#projects">Work</Button>
        <Button href="#contact" variant="secondary">
          Contact
        </Button>
        {site.social.github && (
          <Button href={site.social.github} variant="ghost" external>
            GitHub
          </Button>
        )}
      </div>

      <p className="mt-16 font-mono text-xs text-muted">
        <span className="text-accent">$</span> scroll to explore
        <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent animate-blink" />
      </p>
    </AnimatedSection>
  );
}
