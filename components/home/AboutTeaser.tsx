import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import restaurant from "@/config/restaurant.config";

interface AboutTeaserProps {
  locale: string;
  title: string;
  cta: string;
  reserveCta: string;
}

export default function AboutTeaser({ locale, title, cta, reserveCta }: AboutTeaserProps) {
  const headline = locale === "ar" ? restaurant.about.headlineAr : restaurant.about.headline;
  // First paragraph only
  const story = (locale === "ar" ? restaurant.about.storyAr : restaurant.about.story)
    .split("\n\n")[0];

  return (
    <section className="section-pad bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <AnimatedSection direction="left">
            <div className="relative h-80 md:h-[450px] overflow-hidden bg-[var(--color-surface-2)]">
              <Image
                src={restaurant.about.chefImage}
                alt={restaurant.about.chefName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating name card */}
              <div className="absolute bottom-0 start-0 bg-[var(--color-text)] text-white px-6 py-4">
                <p className="font-display text-lg">{restaurant.about.chefName}</p>
                <p className="text-xs text-white/60 tracking-wide uppercase mt-0.5">
                  {locale === "ar" ? restaurant.about.chefTitleAr : restaurant.about.chefTitle}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection direction="right">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-4">
              {title}
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-5 leading-tight">{headline}</h2>
            <div className="gold-divider mb-6" style={{ margin: "0 0 1.5rem" }} />
            <p className="text-[var(--color-muted)] leading-relaxed mb-8">{story}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/about`} className="btn-dark">
                {cta}
              </Link>
              <Link href={`/${locale}/reservations`} className="btn-primary">
                {reserveCta}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
