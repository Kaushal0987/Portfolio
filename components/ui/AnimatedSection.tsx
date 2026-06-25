"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
};

export function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
}: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
