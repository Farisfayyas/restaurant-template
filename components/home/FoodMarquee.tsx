"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import restaurant from "@/config/restaurant.config";

export default function FoodMarquee() {
  // Pull all menu item images
  const allMenuImages = restaurant.menu
    .flatMap((cat) => cat.items)
    .filter((item) => item.image)
    .map((item) => ({ src: item.image, alt: item.name }));

  // Deduplicate by src
  const seen = new Set<string>();
  const images: { src: string; alt: string }[] = [];
  for (const img of allMenuImages) {
    if (!seen.has(img.src)) {
      seen.add(img.src);
      images.push(img);
    }
  }

  // Split into two rows for visual depth
  const mid  = Math.ceil(images.length / 2);
  const row1 = images.slice(0, mid);
  const row2 = images.slice(mid);

  // Pad rows so each has at least 4 items for a seamless loop
  const pad = (arr: typeof images) =>
    arr.length >= 4 ? arr : [...arr, ...arr, ...arr].slice(0, 6);

  const track1 = pad(row1);
  const track2 = pad(row2.length > 0 ? row2 : row1);

  return (
    // reducedMotion="never" ensures the marquee always runs regardless of OS setting
    <MotionConfig reducedMotion="never">
      <div className="overflow-hidden py-6 bg-[var(--color-surface)] space-y-4">
        {/* Row 1 — slides left. dir="ltr" overrides page RTL so flex always
            lays out left-to-right and the translateX loop math stays correct. */}
        <div className="overflow-hidden" dir="ltr">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            aria-hidden="true"
          >
            {[...track1, ...track1].map((img, i) => (
              <div
                key={`r1-${i}`}
                className="relative w-56 h-44 rounded-2xl overflow-hidden shrink-0 bg-[var(--color-surface-2)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 — slides right */}
        <div className="overflow-hidden" dir="ltr">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            aria-hidden="true"
          >
            {[...track2, ...track2].map((img, i) => (
              <div
                key={`r2-${i}`}
                className="relative w-56 h-44 rounded-2xl overflow-hidden shrink-0 bg-[var(--color-surface-2)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
