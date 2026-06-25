type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        // {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 max-w-xl text-muted ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
