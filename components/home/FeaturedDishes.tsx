import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import DietaryIcon from "@/components/ui/DietaryIcon";
import restaurant from "@/config/restaurant.config";
import { MenuItem } from "@/config/restaurant.config";

interface FeaturedDishesProps {
  locale: string;
  title: string;
  subtitle: string;
  menuLabel: string;
  dietaryLabels: Record<string, string>;
}

export default function FeaturedDishes({ locale, title, subtitle, menuLabel, dietaryLabels }: FeaturedDishesProps) {
  // Collect all featured items
  const featured: MenuItem[] = restaurant.menu
    .flatMap((cat) => cat.items)
    .filter((item) => item.featured)
    .slice(0, 3);

  return (
    <section className="section-pad bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
            {locale === "ar" ? restaurant.cuisineAr : restaurant.cuisine}
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">{title}</h2>
          <div className="gold-divider mb-4" />
          <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto">{subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((item, i) => {
            const name = locale === "ar" ? item.nameAr : item.name;
            const desc = locale === "ar" ? item.descriptionAr : item.description;
            return (
              <AnimatedSection key={item.id} delay={i * 0.12} direction="up">
                <div className="card-hover bg-white/80 backdrop-blur-sm overflow-hidden group" style={{ boxShadow: "0 4px 20px rgba(28,28,28,0.07)" }}>
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-[var(--color-surface-2)]">
                    <Image
                      src={item.image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-xl">{name}</h3>
                      <span className="font-body text-sm font-semibold text-[var(--color-accent)] shrink-0">
                        {item.currency} {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">{desc}</p>
                    {item.dietary.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.dietary.map((tag) => (
                          <DietaryIcon key={tag} tag={tag} label={dietaryLabels[tag] ?? tag} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link href={`/${locale}/menu`} className="btn-dark">
            {menuLabel}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
