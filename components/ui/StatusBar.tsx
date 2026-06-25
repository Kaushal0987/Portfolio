import { site } from "@/data/site";

export function StatusBar() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
      <span className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"
          aria-hidden="true"
        />
        Available for hire
      </span>
      <span className="text-card-border">·</span>
      <span>{site.location}</span>
      <span className="text-card-border">·</span>
      <span>{site.timezone}</span>
      <span className="text-card-border">·</span>
      <span className="text-accent">
        SYS:<span className="font-semibold">ONLINE</span>
      </span>
    </div>
  );
}
