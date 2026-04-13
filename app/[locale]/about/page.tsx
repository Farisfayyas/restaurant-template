import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "من نحن" : "About Us" };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();
  const isAr = locale === "ar";

  const headline = isAr ? restaurant.about.headlineAr : restaurant.about.headline;
  const storyParagraphs = (isAr ? restaurant.about.storyAr : restaurant.about.story).split("\n\n");

  return (
    <div className="pt-32">
      {/* Hero */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
              {isAr ? restaurant.nameAr : restaurant.name}
            </p>
            <h1 className="font-display text-5xl md:text-6xl mb-4">{t("about.title")}</h1>
            <div className="gold-divider" />
          </AnimatedSection>
        </div>
      </div>

      {/* Main story section */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
            {/* Chef image */}
            <AnimatedSection direction="left" className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-2)]">
                <Image
                  src={restaurant.about.chefImage}
                  alt={restaurant.about.chefName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-[var(--color-border)]" />
                <div className="text-center">
                  <p className="font-display text-xl">{restaurant.about.chefName}</p>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mt-1">
                    {isAr ? restaurant.about.chefTitleAr : restaurant.about.chefTitle}
                  </p>
                </div>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
            </AnimatedSection>

            {/* Story text */}
            <div className="space-y-8">
              <AnimatedSection direction="right">
                <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">{headline}</h2>
                <div className="gold-divider mb-6" style={{ margin: "0 0 1.5rem" }} />
                {storyParagraphs.map((para, i) => (
                  <p key={i} className="text-[var(--color-muted)] leading-relaxed mb-4">{para}</p>
                ))}
              </AnimatedSection>

              {/* Awards / press */}
              {restaurant.about.awards.length > 0 && (
                <AnimatedSection direction="right" delay={0.1}>
                  <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-4">
                      {t("about.awards")}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {restaurant.about.awards.map((award) => (
                        <span
                          key={award}
                          className="text-xs font-semibold tracking-wide text-[var(--color-text)] border border-[var(--color-border)] px-4 py-2"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* CTA */}
              <AnimatedSection direction="right" delay={0.15}>
                <Link href={`/${locale}/reservations`} className="btn-primary">
                  {t("about.reserveCta")}
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Founding year banner */}
      <section className="py-20 bg-[var(--color-text)] text-white text-center overflow-hidden relative">
        <div
          className="font-display text-[180px] md:text-[250px] font-bold leading-none text-white/5 select-none pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          {restaurant.about.openedYear}
        </div>
        <AnimatedSection className="relative z-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent-lt)] mb-4">
            {isAr ? "منذ عام" : "Est."}
          </p>
          <p className="font-display text-6xl md:text-8xl">{restaurant.about.openedYear}</p>
          <p className="mt-4 text-white/50 text-sm max-w-md mx-auto">
            {isAr
              ? `${restaurant.about.openedYear} سنوات من الشغف والحرفية`
              : `Years of passion, craft, and unforgettable dining.`}
          </p>
        </AnimatedSection>
      </section>
    </div>
  );
}
