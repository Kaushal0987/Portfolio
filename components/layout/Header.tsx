"use client";

import { site } from "@/data/site";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a
          href="#"
          className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
        >
          {site.name.split(" ")[0]}
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-card-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-card-border px-6 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block font-mono text-xs uppercase tracking-wider text-muted hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
