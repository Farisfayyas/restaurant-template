"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next = locale === "en" ? "ar" : "en";
    // Replace the locale prefix in the current path
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${next}${pathWithoutLocale || ""}`);
  }

  return (
    <button
      onClick={switchLocale}
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
      className={`flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[var(--color-accent)] cursor-pointer ${className}`}
    >
      <Globe size={14} strokeWidth={2} />
      {locale === "en" ? "عربي" : "EN"}
    </button>
  );
}
