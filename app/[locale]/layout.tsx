import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import WhatsAppFAB from "@/components/ui/WhatsAppFAB";
import restaurant from "@/config/restaurant.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: {
      default: isAr ? restaurant.seo.titleAr : restaurant.seo.titleEn,
      template: `%s | ${restaurant.name}`,
    },
    description: isAr ? restaurant.seo.descriptionAr : restaurant.seo.description,
    keywords: [...restaurant.seo.keywords],
    openGraph: {
      siteName: restaurant.name,
      locale: isAr ? "ar_AE" : "en_AE",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Explicit viewport — ensures proper mobile scaling and disables forced-dark-mode
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F2",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className="h-full">
      {/* Raw script runs before React hydration. If Next.js fails to hydrate
          cleanly on mobile (e.g. a loader sets opacity:0 on the root and
          never removes it), this ensures the document root stays visible. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.style.opacity='1';" }} />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileStickyBar />
          <WhatsAppFAB />
        </NextIntlClientProvider>

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: restaurant.name,
              description: restaurant.seo.description,
              address: {
                "@type": "PostalAddress",
                streetAddress: restaurant.address,
                addressLocality: restaurant.city,
                addressCountry: "AE",
              },
              telephone: restaurant.phone,
              email: restaurant.email,
              servesCuisine: restaurant.cuisine,
              url: `https://example.com`,
            }),
          }}
        />
      </body>
    </html>
  );
}
