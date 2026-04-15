"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import restaurant from "@/config/restaurant.config";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const base = `/${locale}`;

  const links = [
    { href: `${base}`,           label: t("home") },
    { href: `${base}/menu`,      label: t("menu") },
    { href: `${base}/order`,     label: t("order") },
    { href: `${base}/location`,  label: t("location") },
    { href: `${base}/gallery`,   label: t("gallery") },
    { href: `${base}/about`,     label: t("about") },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === base || href === `${base}/`) return pathname === base || pathname === `${base}/`;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled || menuOpen ? "glass-nav shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={base}
            className="font-display text-xl md:text-2xl tracking-wide shrink-0"
            style={{ color: isScrolled || menuOpen ? "var(--color-text)" : "#fff" }}
          >
            {restaurant.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link ${isActive(href) ? "active" : ""}`}
                style={{ color: isScrolled ? "var(--color-text)" : "rgba(255,255,255,0.9)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle
              className={isScrolled || menuOpen ? "" : "text-white/90 hover:text-white"}
            />
            {/* Divider */}
            <span
              className={`block w-px h-4 shrink-0 ${isScrolled || menuOpen ? "bg-[var(--color-border)]" : "bg-white/25"}`}
              aria-hidden="true"
            />
            <a
              href={`tel:${restaurant.phone}`}
              aria-label="Call us"
              className={`flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-colors ${
                isScrolled ? "text-[var(--color-text)] hover:text-[var(--color-accent)]" : "text-white/90 hover:text-white"
              }`}
            >
              <Phone size={13} strokeWidth={2.5} />
              <span className="hidden md:inline">{restaurant.phone}</span>
            </a>
            <span className="hidden lg:block w-2" aria-hidden="true" />
            <Link
              href={`${base}/reservations`}
              className="hidden lg:inline-flex btn-primary !py-2.5 !px-5 !text-xs"
            >
              {t("reservations")}
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`lg:hidden p-1 transition-colors ${
                isScrolled || menuOpen ? "text-[var(--color-text)]" : "text-white"
              }`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 glass-nav lg:hidden flex flex-col pt-4 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={href}
                    className={`block py-3 text-base font-medium border-b border-[var(--color-border)] transition-colors ${
                      isActive(href) ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
                    } hover:text-[var(--color-accent)]`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${restaurant.phone}`}
                className="btn-primary w-full justify-center gap-2"
              >
                <Phone size={15} />
                {restaurant.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
