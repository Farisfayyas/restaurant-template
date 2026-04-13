import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ReservationForm from "@/components/reservations/ReservationForm";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "ar" ? "احجز طاولة" : "Reserve a Table" };
}

export default async function ReservationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  const guestOptions = [1,2,3,4,5,6,7,8].map((n) => ({
    value: String(n),
    label: t(`reservations.guests${n}`),
  })).concat([{ value: "9+", label: t("reservations.guestsMore") }]);

  const labels = {
    name: t("reservations.name"), namePlaceholder: t("reservations.namePlaceholder"),
    phone: t("reservations.phone"), phonePlaceholder: t("reservations.phonePlaceholder"),
    email: t("reservations.email"), emailPlaceholder: t("reservations.emailPlaceholder"),
    date: t("reservations.date"), time: t("reservations.time"),
    guests: t("reservations.guests"), guestsPlaceholder: t("reservations.guestsPlaceholder"),
    requests: t("reservations.requests"), requestsPlaceholder: t("reservations.requestsPlaceholder"),
    submit: t("reservations.submit"), submitting: t("reservations.submitting"),
    successTitle: t("reservations.successTitle"), successMessage: t("reservations.successMessage"),
    whatsappConfirm: t("reservations.whatsappConfirm"), errorMessage: t("reservations.errorMessage"),
    guestOptions,
  };

  return (
    <div className="pt-32 section-pad">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
          {/* Left info panel */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection direction="left">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-3">
                {restaurant.name}
              </p>
              <h1 className="font-display text-5xl mb-4">{t("reservations.title")}</h1>
              <div className="gold-divider mb-4" style={{ margin: "0 0 1rem" }} />
              <p className="text-[var(--color-muted)]">{t("reservations.subtitle")}</p>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1} className="space-y-5">
              {/* Contact info */}
              <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-4">
                  {locale === "ar" ? "تواصل معنا" : "Contact"}
                </p>
                <div className="space-y-3 text-sm">
                  <a href={`tel:${restaurant.phone}`}
                     className="block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium">
                    {restaurant.phone}
                  </a>
                  <a href={`mailto:${restaurant.email}`}
                     className="block text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors text-xs">
                    {restaurant.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-4">
                  {t("location.hours")}
                </p>
                <div className="space-y-2 text-sm">
                  {(Object.entries(restaurant.hours) as [string, { open: string; close: string }][]).map(
                    ([day, hrs]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize text-[var(--color-muted)] text-xs">{day}</span>
                        <span className="text-xs font-medium">{hrs.open} — {hrs.close}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Form */}
          <AnimatedSection className="lg:col-span-3" direction="right">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-10">
              <ReservationForm locale={locale} labels={labels} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
