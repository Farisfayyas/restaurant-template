import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import VideoHero from "@/components/home/VideoHero";
import FoodMarquee from "@/components/home/FoodMarquee";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import SocialProof from "@/components/home/SocialProof";
import HomeInfoStrip from "@/components/home/HomeInfoStrip";
import AboutTeaser from "@/components/home/AboutTeaser";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? restaurant.seo.titleAr : restaurant.seo.titleEn,
  };
}

export default async function HomePage({
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

  return (
    <>
      <VideoHero
        locale={locale}
        bookLabel={t("hero.bookTable")}
        menuLabel={t("hero.viewMenu")}
        scrollLabel={t("hero.scrollDown")}
      />
      <FoodMarquee />
      <FeaturedDishes
        locale={locale}
        title={t("home.featuredTitle")}
        subtitle={t("home.featuredSubtitle")}
        menuLabel={t("common.viewAll")}
        dietaryLabels={dietaryLabels}
      />
      <SocialProof
        locale={locale}
        title={t("home.reviewsTitle")}
        subtitle={t("home.reviewsSubtitle")}
      />
      <HomeInfoStrip locale={locale} />
      <AboutTeaser
        locale={locale}
        title={t("home.aboutTitle")}
        cta={t("home.aboutCta")}
        reserveCta={t("home.reserveCta")}
      />
    </>
  );
}
