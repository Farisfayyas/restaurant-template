"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  // opacity is always 1 — text is never hidden regardless of scroll position.
  // Only the translate (y/x slide) animates in; opacity is not part of the
  // entrance effect. This eliminates the class of mobile rendering bug where
  // Framer Motion leaves elements at opacity:0 due to IntersectionObserver
  // misfiring on physical devices.
  const initialMap = {
    up:    { opacity: 1, y: 40 },
    left:  { opacity: 1, x: -40 },
    right: { opacity: 1, x: 40 },
    none:  { opacity: 1 },
  };

  const animateMap = {
    up:    { opacity: 1, y: 0 },
    left:  { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none:  { opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      className={`animated-section${className ? ` ${className}` : ""}`}
      initial={initialMap[direction]}
      animate={isInView ? animateMap[direction] : initialMap[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
