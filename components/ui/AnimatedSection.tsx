"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Always call — hooks must not be conditional.
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const wrapperClass = `animated-section${className ? ` ${className}` : ""}`;

  // On mobile: bypass Framer Motion entirely. Renders a plain <div> with no
  // animation library involvement. This eliminates framer-motion as a possible
  // cause of hydration failures or invisible content on physical devices.
  if (isMobile) {
    return <div className={wrapperClass}>{children}</div>;
  }

  // Desktop: slide-in animation. opacity is always 1 — only the translate
  // (y/x) animates, so content is never hidden even if isInView misfires.
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
      className={wrapperClass}
      initial={initialMap[direction]}
      animate={isInView ? animateMap[direction] : initialMap[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
