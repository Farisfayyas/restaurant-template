import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { Phone, MapPin, CalendarCheck } from "lucide-react";
import restaurant from "@/config/restaurant.config";

export default async function MobileStickyBar() {
  const t = await getTranslations("mobile");
  const locale = await getLocale();

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden mobile-sticky bg-[var(--color-text)] border-t border-white/10 flex">
      <a
        href={`tel:${restaurant.phone}`}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors active:bg-white/10"
      >
        <Phone size={18} strokeWidth={2} />
        <span className="text-[10px] font-semibold tracking-widest uppercase">{t("call")}</span>
      </a>
      <Link
        href={`/${locale}/location`}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors border-x border-white/10 active:bg-white/10"
      >
        <MapPin size={18} strokeWidth={2} />
        <span className="text-[10px] font-semibold tracking-widest uppercase">{t("location")}</span>
      </Link>
      <Link
        href={`/${locale}/reservations`}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[var(--color-accent-lt)] hover:text-white hover:bg-white/5 transition-colors active:bg-white/10"
      >
        <CalendarCheck size={18} strokeWidth={2} />
        <span className="text-[10px] font-semibold tracking-widest uppercase">{t("book")}</span>
      </Link>
    </div>
  );
}
