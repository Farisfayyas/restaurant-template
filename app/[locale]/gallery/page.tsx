import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GalleryClient from "@/components/gallery/GalleryClient";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "المعرض" : "Gallery" };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("gallery");

  return (
    <>
      <div className="pt-32 pb-10 bg-[var(--color-surface)] text-center border-b border-[var(--color-border)]">
        <AnimatedSection>
          <h1 className="font-display text-5xl md:text-6xl mb-3">{t("title")}</h1>
          <div className="gold-divider mb-4" />
          <p className="text-[var(--color-muted)] text-sm">{t("subtitle")}</p>
        </AnimatedSection>
      </div>

      <GalleryClient
        locale={locale}
        images={restaurant.gallery as unknown as typeof restaurant.gallery}
        labels={{
          filterAll:      t("filterAll"),
          filterInterior: t("filterInterior"),
          filterFood:     t("filterFood"),
          filterEvents:   t("filterEvents"),
        }}
      />
    </>
  );
}
