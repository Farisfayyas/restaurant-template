"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import OpenStatusBadge from "./OpenStatusBadge";
import restaurant from "@/config/restaurant.config";

interface VideoHeroProps {
  locale: string;
  bookLabel: string;
  menuLabel: string;
  scrollLabel: string;
}

export default function VideoHero({ locale, bookLabel, menuLabel, scrollLabel }: VideoHeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const name = locale === "ar" ? restaurant.nameAr : restaurant.name;
  const tagline = locale === "ar" ? restaurant.taglineAr : restaurant.tagline;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badgeRef.current, { opacity: 0, y: -12, duration: 0.5, delay: 0.3 })
        .from(headlineRef.current, { opacity: 0, y: 30, duration: 0.9 }, "-=0.2")
        .from(taglineRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.6")
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={restaurant.heroVideo}
        poster={restaurant.heroFallbackImage}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        <div ref={badgeRef}>
          <OpenStatusBadge locale={locale} />
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mt-5 mb-4"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          {name}
        </h1>

        <p
          ref={taglineRef}
          className="font-display italic text-lg sm:text-xl md:text-2xl text-white/80 mb-10 tracking-wide"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
        >
          {tagline}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}/reservations`} className="btn-primary min-w-[180px]">
            {bookLabel}
          </Link>
          <Link href={`/${locale}/menu`} className="btn-outline min-w-[160px]">
            {menuLabel}
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs tracking-widest uppercase font-medium hidden sm:block">{scrollLabel}</span>
        <ArrowDown size={18} strokeWidth={1.5} />
      </div>
    </section>
  );
}
