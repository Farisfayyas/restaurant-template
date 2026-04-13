import restaurant from "@/config/restaurant.config";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

/** Build a wa.me URL with a pre-filled order message */
export function buildOrderWhatsAppUrl(items: OrderItem[], locale: string = "en"): string {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const currency = "AED";

  const lines = items.map((i) => `• ${i.quantity}x ${i.name} — ${currency} ${(i.price * i.quantity).toFixed(0)}`);

  const message =
    locale === "ar"
      ? `مرحباً! أرغب في تقديم الطلب التالي:\n\n${lines.join("\n")}\n\nالمجموع: ${currency} ${total.toFixed(0)}`
      : `Hello! I'd like to place the following order:\n\n${lines.join("\n")}\n\nTotal: ${currency} ${total.toFixed(0)}`;

  return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Build a wa.me URL for a general greeting/question */
export function buildGreetingWhatsAppUrl(restaurantName: string, locale: string = "en"): string {
  const message =
    locale === "ar"
      ? `مرحباً! لدي سؤال حول ${restaurantName}`
      : `Hi! I have a question about ${restaurantName}`;
  return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Build a wa.me URL for a reservation confirmation */
export function buildReservationWhatsAppUrl(restaurantName: string, locale: string = "en"): string {
  const message =
    locale === "ar"
      ? `مرحباً! أود تأكيد حجزي في ${restaurantName}`
      : `Hi! I'd like to confirm my reservation at ${restaurantName}`;
  return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`;
}
