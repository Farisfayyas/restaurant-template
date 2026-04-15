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

  // 200px margin triggers the observer before the element fully enters the
  // viewport — helpful on desktop. On mobile we bypass isInView entirely.
  const isInView = useInView(ref, { once: true, margin: "200px" });

  // On mobile: show immediately after mount (isMobile flips to true in the
  // first useEffect, triggering Framer Motion to animate to the visible state
  // without waiting for IntersectionObserver, which can misfire on mobile).
  const shouldShow = isMobile || isInView;

  // opacity:0.01 instead of 0 — some mobile browsers (WebKit/Blink) skip
  // painting elements with opacity:0 entirely as a memory optimisation,
  // removing them from the GPU render pipeline so they never appear even
  // after the animation fires. 0.01 is visually identical but forces the
  // browser to keep a layer allocated for the element from the first paint.
  const initialMap = {
    up:    { opacity: 0.01, y: 40 },
    left:  { opacity: 0.01, x: -40 },
    right: { opacity: 0.01, x: 40 },
    none:  { opacity: 0.01 },
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
      animate={shouldShow ? animateMap[direction] : initialMap[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
