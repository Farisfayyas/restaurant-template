"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Info } from "lucide-react";
import DietaryIcon from "@/components/ui/DietaryIcon";
import { MenuCategory, MenuItem, DietaryTag } from "@/config/restaurant.config";

interface MenuClientProps {
  locale: string;
  categories: MenuCategory[];
  dietaryLabels: Record<string, string>;
  labels: {
    filterAll: string;
    filterVegan: string;
    filterSpicy: string;
    filterGlutenFree: string;
    pairsWell: string;
    chefsRecommendation: string;
    addToOrder: string;
    orderNow: string;
    aed: string;
  };
}

type DietaryFilter = "all" | DietaryTag;

export default function MenuClient({ locale, categories, dietaryLabels, labels }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");
  const [hoveredPairing, setHoveredPairing] = useState<string | null>(null);

  const currentCategory = categories.find((c) => c.id === activeCategory) ?? categories[0];

  const filteredItems = currentCategory?.items.filter((item) => {
    if (dietaryFilter === "all") return true;
    return item.dietary.includes(dietaryFilter as DietaryTag);
  }) ?? [];

  const dietaryFilters: { key: DietaryFilter; label: string }[] = [
    { key: "all",        label: labels.filterAll },
    { key: "vegan",      label: labels.filterVegan },
    { key: "spicy",      label: labels.filterSpicy },
    { key: "glutenFree", label: labels.filterGlutenFree },
  ];

  return (
    <div>
      {/* Category tabs */}
      <div className="sticky top-16 md:top-20 z-20 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="category-tabs flex overflow-x-auto gap-8 md:gap-12 md:justify-center border-b border-[var(--color-border)]">
            {categories.map((cat) => {
              const label = locale === "ar" ? cat.categoryAr : cat.category;
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 font-display px-2 py-5 text-base md:text-lg tracking-wide transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
                    isActive
                      ? "border-[var(--color-accent)] text-[var(--color-text)] font-semibold"
                      : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        {/* Dietary filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {dietaryFilters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setDietaryFilter(key)}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full border transition-all cursor-pointer ${
                dietaryFilter === key
                  ? "bg-[var(--color-text)] text-white border-[var(--color-text)]"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display text-3xl md:text-4xl mb-8">
              {locale === "ar" ? currentCategory?.categoryAr : currentCategory?.category}
            </h2>

            {/* Items grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  dietaryLabels={dietaryLabels}
                  labels={labels}
                  isHoveredPairing={hoveredPairing === item.id}
                  onHoverPairing={(id) => setHoveredPairing(id)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Order CTA */}
        <div className="mt-14 text-center p-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl">
          <p className="font-display text-2xl md:text-3xl mb-2">
            {locale === "ar" ? "هل أنت مستعد للطلب؟" : "Ready to Order?"}
          </p>
          <p className="text-[var(--color-muted)] text-sm mb-6">
            {locale === "ar"
              ? "اطلب مباشرة عبر واتساب أو احجز طاولة."
              : "Order directly via WhatsApp or book your table in advance."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={`/${locale}/order`} className="btn-primary">{labels.orderNow}</Link>
            <Link href={`/${locale}/reservations`} className="btn-dark">
              {locale === "ar" ? "احجز طاولة" : "Book a Table"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItemCard({
  item,
  locale,
  dietaryLabels,
  labels,
  isHoveredPairing,
  onHoverPairing,
}: {
  item: MenuItem;
  locale: string;
  dietaryLabels: Record<string, string>;
  labels: MenuClientProps["labels"];
  isHoveredPairing: boolean;
  onHoverPairing: (id: string | null) => void;
}) {
  const name = locale === "ar" ? item.nameAr : item.name;
  const desc = locale === "ar" ? item.descriptionAr : item.description;

  return (
    <motion.div
      className="group relative flex gap-4 p-5 bg-white/70 md:backdrop-blur-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all rounded-2xl"
      style={{ boxShadow: "0 2px 12px rgba(28,28,28,0.06)" }}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => item.pairsWith.length > 0 && onHoverPairing(item.id)}
      onMouseLeave={() => onHoverPairing(null)}
    >
      {/* Image */}
      <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-[var(--color-surface-2)] rounded-xl">
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="96px"
        />
        {item.dietary.includes("chefSpecial") && (
          <div className="absolute top-1 start-1">
            <Star size={12} fill="#C9A84C" stroke="none" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-lg leading-tight">{name}</h3>
          <span className="text-sm font-semibold text-[var(--color-accent)] shrink-0">
            {labels.aed} {item.price}
          </span>
        </div>
        <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-2 line-clamp-2">{desc}</p>
        {item.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.dietary.map((tag) => (
              <DietaryIcon key={tag} tag={tag} label={dietaryLabels[tag] ?? tag} />
            ))}
          </div>
        )}
      </div>

      {/* Pairing tooltip */}
      <AnimatePresence>
        {isHoveredPairing && item.pairsWith.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full start-0 end-0 mb-2 z-10 bg-[var(--color-text)] text-white px-4 py-3 shadow-xl pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-1">
              <Info size={11} />
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-gold-lt)]">
                {labels.pairsWell}
              </span>
            </div>
            <p className="text-xs text-white/80">{item.pairsWith.join(", ")}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
