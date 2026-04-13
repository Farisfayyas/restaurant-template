import { getOpenStatus } from "@/lib/openStatus";
import { Circle } from "lucide-react";

interface OpenStatusBadgeProps {
  locale: string;
  dark?: boolean; // show on dark background (hero) vs light
}

export default function OpenStatusBadge({ locale, dark = true }: OpenStatusBadgeProps) {
  const status = getOpenStatus();
  const label = locale === "ar" ? status.statusTextAr : status.statusText;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
        dark
          ? "bg-white/15 backdrop-blur-sm text-white border border-white/20"
          : `${status.isOpen ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`
      }`}
    >
      <Circle
        size={7}
        fill={status.isOpen ? "#4ade80" : "#f87171"}
        strokeWidth={0}
        className={status.isOpen ? "animate-pulse" : ""}
      />
      {label}
    </div>
  );
}
