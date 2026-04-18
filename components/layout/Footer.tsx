import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import restaurant from "@/config/restaurant.config";

export default async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  const links = [
    { href: `${base}`,              label: t("nav.home") },
    { href: `${base}/menu`,         label: t("nav.menu") },
    { href: `${base}/reservations`, label: t("nav.reservations") },
    { href: `${base}/order`,        label: t("nav.order") },
    { href: `${base}/gallery`,      label: t("nav.gallery") },
    { href: `${base}/about`,        label: t("nav.about") },
    { href: `${base}/location`,     label: t("nav.location") },
  ];

  return (
    <footer className="bg-[var(--color-text)] text-white/80 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-white tracking-wide">
              {locale === "ar" ? restaurant.nameAr : restaurant.name}
            </h2>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              {locale === "ar" ? restaurant.taglineAr : restaurant.tagline}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {restaurant.social.instagram && (
                <a href={restaurant.social.instagram} target="_blank" rel="noopener noreferrer"
                   aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {restaurant.social.facebook && (
                <a href={restaurant.social.facebook} target="_blank" rel="noopener noreferrer"
                   aria-label="Facebook" className="text-white/50 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {/* TikTok */}
              {restaurant.social.tiktok && (
                <a href={restaurant.social.tiktok} target="_blank" rel="noopener noreferrer"
                   aria-label="TikTok" className="text-white/50 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              {locale === "ar" ? "تواصل معنا" : "Contact"}
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm text-white/60">
                <MapPin size={15} className="shrink-0 mt-0.5 text-[var(--color-accent-lt)]" />
                <span>{locale === "ar" ? restaurant.addressAr : restaurant.address}</span>
              </div>
              <a href={`tel:${restaurant.phone}`}
                 className="flex gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={15} className="shrink-0 text-[var(--color-accent-lt)]" />
                {restaurant.phone}
              </a>
              <a href={`mailto:${restaurant.email}`}
                 className="flex gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={15} className="shrink-0 text-[var(--color-accent-lt)]" />
                {restaurant.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {year} {restaurant.name}. {t("footer.rights")}</p>
          <LanguageToggle className="text-white/40 hover:text-white/70" />
        </div>
      </div>
    </footer>
  );
}
