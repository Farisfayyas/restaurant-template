"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { GalleryImage, GalleryCategory } from "@/config/restaurant.config";

interface GalleryClientProps {
  locale: string;
  images: GalleryImage[];
  labels: {
    filterAll: string;
    filterInterior: string;
    filterFood: string;
    filterEvents: string;
  };
}

const FILTERS: { key: GalleryCategory | "all"; labelKey: keyof GalleryClientProps["labels"] }[] = [
  { key: "all",      labelKey: "filterAll" },
  { key: "interior", labelKey: "filterInterior" },
  { key: "food",     labelKey: "filterFood" },
  { key: "events",   labelKey: "filterEvents" },
];

export default function GalleryClient({ locale, images, labels }: GalleryClientProps) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const filtered = images.filter((img) => filter === "all" || img.category === filter);

  const slides = filtered.map((img) => ({
    src: img.src,
    alt: locale === "ar" ? img.altAr : img.alt,
  }));

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      {/* Filter tabs */}
      <div className="gallery-filters flex flex-wrap gap-2 mb-10 justify-center">
        {FILTERS.map(({ key, labelKey }) => (
          <a
            key={key}
            href={`#gallery-${key}`}
            onClick={(e) => { e.preventDefault(); setFilter(key); }}
            className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer no-underline ${
              filter === key
                ? "bg-[var(--color-text)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
            }`}
          >
            {labels[labelKey]}
          </a>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="masonry-grid">
        {isMobile ? (
          // Mobile: plain divs — no Framer Motion, no layout animations,
          // no stacking contexts that could intercept touch events.
          filtered.map((img, i) => {
            const alt = locale === "ar" ? img.altAr : img.alt;
            return (
              <div
                key={img.src}
                className="masonry-item group relative overflow-hidden cursor-pointer bg-[var(--color-surface-2)]"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${alt}`}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
              >
                <div className="relative w-full" style={{ paddingTop: i % 3 === 0 ? "133%" : "75%" }}>
                  <Image
                    src={img.src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>
            );
          })
        ) : (
          // Desktop: animated grid with layout transitions.
          // opacity starts at 1 — only y animates — so items are never
          // invisible even if animate() misfires.
          <AnimatePresence>
            {filtered.map((img, i) => {
              const alt = locale === "ar" ? img.altAr : img.alt;
              return (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 1, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="masonry-item group relative overflow-hidden cursor-pointer bg-[var(--color-surface-2)]"
                  onClick={() => setLightboxIndex(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${alt}`}
                  onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
                >
                  <div className="relative w-full" style={{ paddingTop: i % 3 === 0 ? "133%" : "75%" }}>
                    <Image
                      src={img.src}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {alt}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          open
          close={() => setLightboxIndex(null)}
          index={lightboxIndex}
          slides={slides}
          styles={{
            container: { backgroundColor: "rgba(28, 28, 28, 0.97)" },
          }}
        />
      )}
    </div>
  );
}
