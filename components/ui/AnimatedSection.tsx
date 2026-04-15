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

  const isInView = useInView(ref, { once: true, margin: isMobile ? "100px" : "0px" });

  const initialMap = {
    up:    { opacity: 0, y: 40 },
    left:  { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    none:  { opacity: 0 },
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
    >
      {children}
    </motion.div>
  );
}
