import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import LocationClient from "@/components/location/LocationClient";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "الموقع وساعات العمل" : "Location & Hours" };
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const dayLabels = {
    monday: t("location.days.monday"), tuesday: t("location.days.tuesday"),
    wednesday: t("location.days.wednesday"), thursday: t("location.days.thursday"),
    friday: t("location.days.friday"), saturday: t("location.days.saturday"),
    sunday: t("location.days.sunday"),
  };

  return (
    <>
      <div className="pt-32 pb-10 bg-[var(--color-surface)] text-center border-b border-[var(--color-border)]">
        <AnimatedSection>
          <h1 className="font-display text-5xl md:text-6xl mb-3">{t("location.title")}</h1>
          <div className="gold-divider mb-4" />
          <p className="text-[var(--color-muted)] text-sm">{t("location.subtitle")}</p>
        </AnimatedSection>
      </div>

      <LocationClient
        locale={locale}
        mapEmbed={restaurant.googleMapsEmbed}
        address={locale === "ar" ? restaurant.addressAr : restaurant.address}
        phone={restaurant.phone}
        hours={restaurant.hours}
        holidayOverrides={restaurant.holidayOverrides as unknown as Array<{ date: string; label: string; labelAr: string; open: string; close: string; closed?: boolean }>}
        labels={{
          address: t("location.address"),
          copyAddress: t("location.copyAddress"),
          copied: t("location.copied"),
          hours: t("location.hours"),
          getDirections: t("location.getDirections"),
          callUs: t("location.callUs"),
          today: t("location.today"),
          closed: t("location.closed"),
          holidayHours: t("location.holidayHours"),
          dayLabels,
        }}
      />
    </>
  );
}
