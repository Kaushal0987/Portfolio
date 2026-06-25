import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const styles = {
    primary:
      "border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-background",
    secondary:
      "border border-card-border bg-card text-foreground hover:border-accent hover:text-accent",
    ghost:
      "border border-transparent text-muted hover:border-card-border hover:text-foreground",
  }[variant];

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
