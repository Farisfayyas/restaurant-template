import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MenuClient from "@/components/menu/MenuClient";
import MenuScrollStopper from "@/components/menu/MenuScrollStopper";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "القائمة" : "Menu",
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const dietaryLabels = {
    vegan:       t("dietary.vegan"),
    spicy:       t("dietary.spicy"),
    glutenFree:  t("dietary.glutenFree"),
    chefSpecial: t("dietary.chefSpecial"),
  };

  const menuLabels = {
    filterAll:           t("menu.filterAll"),
    filterVegan:         t("menu.filterVegan"),
    filterSpicy:         t("menu.filterSpicy"),
    filterGlutenFree:    t("menu.filterGlutenFree"),
    pairsWell:           t("menu.pairsWell"),
    chefsRecommendation: t("menu.chefsRecommendation"),
    addToOrder:          t("menu.addToOrder"),
    orderNow:            t("menu.orderNow"),
    aed:                 t("menu.aed"),
  };

  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-12 bg-[var(--color-surface)] text-center border-b border-[var(--color-border)]">
        <AnimatedSection>
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
            {locale === "ar" ? restaurant.cuisineAr : restaurant.cuisine}
          </p>
          <h1 className="font-display text-5xl md:text-6xl mb-3">{t("menu.title")}</h1>
          <div className="gold-divider mb-4" />
          <p className="text-[var(--color-muted)] text-sm">{t("menu.subtitle")}</p>
        </AnimatedSection>
      </div>

      <MenuScrollStopper locale={locale} />

      <MenuClient
        locale={locale}
        categories={restaurant.menu as unknown as typeof restaurant.menu}
        dietaryLabels={dietaryLabels}
        labels={menuLabels}
      />
    </>
  );
}
