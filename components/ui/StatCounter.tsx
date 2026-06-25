"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type StatCounterProps = {
  value: number;
  label: string;
  suffix?: string;
};

export function StatCounter({ value, label, suffix = "" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </p>
    </div>
  );
}

type StatTextProps = {
  value: string;
  label: string;
};

export function StatText({ value, label }: StatTextProps) {
  return (
    <div className="text-center">
      <p className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {value}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </p>
    </div>
  );
}
