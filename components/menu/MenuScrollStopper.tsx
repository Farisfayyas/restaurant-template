"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import restaurant from "@/config/restaurant.config";

interface MenuScrollStopperProps {
  locale: string;
}

export default function MenuScrollStopper({ locale }: MenuScrollStopperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const quote =
    locale === "ar"
      ? `"الطعام الجيد هو أساس السعادة الحقيقية"`
      : `"Good food is the foundation of genuine happiness"`;

  const quoteAttrib =
    locale === "ar" ? "— أوغست إسكوفييه" : "— Auguste Escoffier";

  const cuisine = locale === "ar" ? restaurant.cuisineAr : restaurant.cuisine;

  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y: bgY, scale: 1.15 }}
      >
        {/* Background image — shows the hero fallback as a food backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.heroFallbackImage})` }}
          aria-hidden="true"
        />
        {/* Rich dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18,14,10,0.55) 0%, rgba(18,14,10,0.72) 50%, rgba(18,14,10,0.88) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--color-gold)" }}
        >
          {cuisine}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-3xl sm:text-4xl md:text-5xl text-white max-w-2xl leading-tight mb-5"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          {quote}
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/50 text-sm tracking-widest"
        >
          {quoteAttrib}
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1.5 animate-bounce"
          aria-hidden="true"
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}
