import restaurant from "@/config/restaurant.config";

interface HomeInfoStripProps {
  locale: string;
}

function formatHoursBar(locale: string): string {
  const h = restaurant.hours;
  const monClose = h.monday.close;
  const friClose = h.friday.close;

  if (locale === "ar") {
    return `ساعات العمل: الاثنين – الخميس 12:00–${monClose} | الجمعة – السبت 12:00–${friClose} | الأحد 12:00–${h.sunday.close}`;
  }
  return `Opening Hours: Mon – Thu 12:00 – ${monClose}  ·  Fri – Sat 12:00 – ${friClose}  ·  Sun 12:00 – ${h.sunday.close}`;
}

export default function HomeInfoStrip({ locale }: HomeInfoStripProps) {
  const address = locale === "ar" ? restaurant.addressAr : restaurant.address;
  const hoursBar = formatHoursBar(locale);

  return (
    <section aria-label={locale === "ar" ? "معلومات المطعم" : "Restaurant Info"}>
      {/* Dark 3-column body */}
      <div className="bg-[var(--color-text)] py-10 px-5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Location */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-2">
              {locale === "ar" ? "الموقع" : "Location"}
            </p>
            <p className="text-sm text-white/85 leading-relaxed">{address}</p>
          </div>

          {/* Instagram */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-2">
              {locale === "ar" ? "انستغرام" : "Instagram"}
            </p>
            <a
              href={restaurant.social.instagram ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/85 hover:text-white transition-colors"
            >
              {restaurant.instagramHandle}
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-2">
              {locale === "ar" ? "تواصل معنا" : "Contact"}
            </p>
            <a
              href={`tel:${restaurant.phone}`}
              className="text-sm text-white/85 hover:text-white transition-colors"
            >
              {restaurant.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Accent hours bar */}
      <div className="bg-[var(--color-accent)] py-3 px-5 text-center">
        <p className="text-xs text-white font-medium tracking-wide">{hoursBar}</p>
      </div>
    </section>
  );
}
