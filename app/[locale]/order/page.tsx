import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import OrderClient from "@/components/order/OrderClient";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "اطلب أونلاين" : "Order Online" };
}

export default async function OrderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const dietaryLabels = {
    vegan: t("dietary.vegan"), spicy: t("dietary.spicy"),
    glutenFree: t("dietary.glutenFree"), chefSpecial: t("dietary.chefSpecial"),
  };

  const labels = {
    filterAll:  t("menu.filterAll"),
    add:        t("order.addToOrder"),
    remove:     t("order.remove"),
    yourOrder:  t("order.yourOrder"),
    emptyOrder: t("order.emptyOrder"),
    subtotal:   t("order.subtotal"),
    sendOrder:  t("order.sendOrder"),
    orderSent:  t("order.orderSent"),
    note:       t("order.note"),
    aed:        t("order.aed"),
  };

  return (
    <>
      <div className="pt-32 pb-10 bg-[var(--color-surface)] text-center border-b border-[var(--color-border)]">
        <AnimatedSection>
          <h1 className="font-display text-5xl md:text-6xl mb-3">{t("order.title")}</h1>
          <div className="gold-divider mb-4" />
          <p className="text-[var(--color-muted)] text-sm">{t("order.subtitle")}</p>
        </AnimatedSection>
      </div>

      <OrderClient
        locale={locale}
        categories={restaurant.menu as unknown as typeof restaurant.menu}
        dietaryLabels={dietaryLabels}
        labels={labels}
      />
    </>
  );
}
