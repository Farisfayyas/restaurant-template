"use client";

import { useState } from "react";
import { MapPin, Phone, Navigation, Copy, Check, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface HolidayOverride {
  date: string;
  label: string;
  labelAr: string;
  open: string;
  close: string;
  closed?: boolean;
}

interface DayHours {
  open: string;
  close: string;
  closed?: boolean;
}

interface LocationClientProps {
  locale: string;
  mapEmbed: string;
  address: string;
  phone: string;
  hours: Record<string, DayHours>;
  holidayOverrides: HolidayOverride[];
  labels: {
    address: string; copyAddress: string; copied: string;
    hours: string; getDirections: string; callUs: string;
    today: string; closed: string; holidayHours: string;
    dayLabels: Record<string, string>;
  };
}

const DAY_ORDER = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

function formatTime12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const s = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2,"0")} ${s}`;
}

function todayDayName() {
  return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()];
}

export default function LocationClient({ locale, mapEmbed, address, phone, hours, holidayOverrides, labels }: LocationClientProps) {
  const [copied, setCopied] = useState(false);
  const today = todayDayName();
  const todayStr = new Date().toISOString().split("T")[0];
  const todayHoliday = holidayOverrides.find(o => o.date === todayStr);

  async function copyAddress() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="section-pad">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Map */}
          <AnimatedSection className="lg:col-span-3 order-2 lg:order-1">
            <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
              <iframe
                src={mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant location on Google Maps"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </AnimatedSection>

          {/* Info panel */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            {/* Address */}
            <AnimatedSection direction="right">
              <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-4">
                  {labels.address}
                </p>
                <div className="flex gap-3 mb-4">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                  <p className="text-sm leading-relaxed">{address}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary !py-2.5 !px-4 !text-xs flex items-center gap-2"
                  >
                    <Navigation size={13} />
                    {labels.getDirections}
                  </a>
                  <button onClick={copyAddress}
                    className="btn-dark !py-2.5 !px-4 !text-xs flex items-center gap-2 cursor-pointer"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? labels.copied : labels.copyAddress}
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Phone */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-3">
                  {labels.callUs}
                </p>
                <a href={`tel:${phone}`}
                   className="flex items-center gap-3 text-lg font-display hover:text-[var(--color-accent)] transition-colors">
                  <Phone size={18} className="text-[var(--color-accent)]" />
                  {phone}
                </a>
              </div>
            </AnimatedSection>

            {/* Hours */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-[var(--color-accent)]" />
                  <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-muted)]">
                    {labels.hours}
                  </p>
                </div>
                <div className="space-y-2">
                  {DAY_ORDER.map((day) => {
                    const dayHours = hours[day];
                    const isToday = day === today;
                    return (
                      <div
                        key={day}
                        className={`flex justify-between items-center py-2 text-sm ${
                          isToday ? "text-[var(--color-text)] font-semibold" : "text-[var(--color-muted)]"
                        } ${isToday ? "border-l-2 border-[var(--color-accent)] pl-3" : ""}`}
                      >
                        <span className="capitalize flex items-center gap-1.5">
                          {labels.dayLabels[day] ?? day}
                          {isToday && (
                            <span className="text-[10px] font-semibold tracking-wide text-[var(--color-accent)] uppercase">
                              ({labels.today})
                            </span>
                          )}
                        </span>
                        <span className="text-xs">
                          {dayHours?.closed
                            ? labels.closed
                            : dayHours
                            ? `${formatTime12h(dayHours.open)} – ${formatTime12h(dayHours.close)}`
                            : labels.closed}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Holiday overrides */}
                {holidayOverrides.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-3">
                      {labels.holidayHours}
                    </p>
                    <div className="space-y-2">
                      {holidayOverrides.map((o) => (
                        <div key={o.date} className="flex justify-between text-xs">
                          <span className="text-[var(--color-muted)]">
                            {locale === "ar" ? o.labelAr : o.label}
                          </span>
                          <span className={o.closed ? "text-red-500" : "font-medium"}>
                            {o.closed ? labels.closed : `${formatTime12h(o.open)} – ${formatTime12h(o.close)}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
