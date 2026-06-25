import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          {site.name} · {site.location} · © {year}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
          >
            Email
          </a>
          {site.social.github && (
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
            >
              GitHub
            </a>
          )}
          {site.social.whatsapp && (
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
