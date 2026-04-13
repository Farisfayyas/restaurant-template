"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, MessageCircle, X } from "lucide-react";
import DietaryIcon from "@/components/ui/DietaryIcon";
import { buildOrderWhatsAppUrl } from "@/lib/whatsapp";
import { MenuCategory, MenuItem } from "@/config/restaurant.config";

interface CartItem extends MenuItem {
  quantity: number;
}

interface OrderClientProps {
  locale: string;
  categories: MenuCategory[];
  dietaryLabels: Record<string, string>;
  labels: {
    filterAll: string;
    add: string;
    remove: string;
    yourOrder: string;
    emptyOrder: string;
    subtotal: string;
    sendOrder: string;
    orderSent: string;
    note: string;
    aed: string;
  };
}

export default function OrderClient({ locale, categories, dietaryLabels, labels }: OrderClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [sending, setSending] = useState(false);

  const currentCategory = categories.find((c) => c.id === activeCategory);
  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function addItem(item: MenuItem) {
    setCart((prev) => ({
      ...prev,
      [item.id]: prev[item.id]
        ? { ...prev[item.id], quantity: prev[item.id].quantity + 1 }
        : { ...item, quantity: 1 },
    }));
  }

  function removeItem(itemId: string) {
    setCart((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: { ...existing, quantity: existing.quantity - 1 } };
    });
  }

  function clearItem(itemId: string) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  }

  function sendViaWhatsApp() {
    setSending(true);
    const orderItems = cartItems.map((i) => ({ name: locale === "ar" ? i.nameAr : i.name, quantity: i.quantity, price: i.price }));
    const url = buildOrderWhatsAppUrl(orderItems, locale);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setSending(false), 2000);
  }

  const cartCount = useMemo(() => cartItems.reduce((sum, i) => sum + i.quantity, 0), [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu column */}
        <div className="lg:col-span-2">
          {/* Category tabs */}
          <div className="category-tabs flex overflow-x-auto gap-1 mb-7 pb-1">
            {categories.map((cat) => {
              const label = locale === "ar" ? cat.categoryAr : cat.category;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer ${
                    cat.id === activeCategory
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {currentCategory?.items.map((item) => {
                const name = locale === "ar" ? item.nameAr : item.name;
                const desc = locale === "ar" ? item.descriptionAr : item.description;
                const qty = cart[item.id]?.quantity ?? 0;
                return (
                  <div key={item.id} className="flex gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <div className="relative w-20 h-20 shrink-0 bg-[var(--color-surface-2)] overflow-hidden">
                      <Image src={item.image} alt={name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-display text-base leading-tight">{name}</h3>
                        <span className="text-sm font-semibold text-[var(--color-accent)] shrink-0">
                          {labels.aed} {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-muted)] line-clamp-1 mb-2">{desc}</p>
                      {item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.dietary.map((tag) => (
                            <DietaryIcon key={tag} tag={tag} label={dietaryLabels[tag]} />
                          ))}
                        </div>
                      )}
                      {/* Add/remove controls */}
                      <div className="flex items-center gap-2 mt-1">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                              aria-label="Remove one"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-5 text-center">{qty}</span>
                            <button
                              onClick={() => addItem(item)}
                              className="w-7 h-7 flex items-center justify-center bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dk)] transition-colors cursor-pointer"
                              aria-label="Add one"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addItem(item)}
                            className="text-xs font-semibold tracking-wide text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={12} />
                            {labels.add}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Order summary — sticky on desktop, bottom drawer on mobile */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-[var(--color-text)] text-white p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShoppingBag size={18} />
              <h2 className="font-display text-xl">{labels.yourOrder}</h2>
              {cartCount > 0 && (
                <span className="ms-auto w-6 h-6 rounded-full bg-[var(--color-accent)] text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>

            {cartItems.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-8">{labels.emptyOrder}</p>
            ) : (
              <div className="space-y-3 mb-5">
                {cartItems.map((item) => {
                  const name = locale === "ar" ? item.nameAr : item.name;
                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[var(--color-accent-lt)] w-5 shrink-0">
                        {item.quantity}×
                      </span>
                      <span className="text-sm flex-1 text-white/80">{name}</span>
                      <span className="text-sm font-medium text-white/60">
                        {labels.aed} {item.price * item.quantity}
                      </span>
                      <button
                        onClick={() => clearItem(item.id)}
                        className="text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  );
                })}
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
                    {labels.subtotal}
                  </span>
                  <span className="font-semibold text-white">{labels.aed} {subtotal}</span>
                </div>
              </div>
            )}

            <button
              onClick={sendViaWhatsApp}
              disabled={cartItems.length === 0 || sending}
              className="btn-primary w-full justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: cartItems.length > 0 ? "#25D366" : undefined }}
            >
              <MessageCircle size={16} />
              {sending ? labels.orderSent : labels.sendOrder}
            </button>

            <p className="text-white/30 text-[10px] text-center mt-3 leading-relaxed">{labels.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
