import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { getProductById, FREE_SHIPPING_THRESHOLD } from "@/data/products";
import { useCart } from "@/lib/store";
import { inr } from "@/lib/format";

export default function CartDrawer() {
  const {
    lines,
    subtotal,
    updateQty,
    removeLine,
    cartOpen,
    setCartOpen,
  } = useCart();

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[70]" data-testid="cart-drawer-root">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-testid="cart-drawer-overlay"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            data-testid="cart-drawer"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-[#161616] text-cream"
            role="dialog"
            aria-label="Shopping bag"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-cream/15 px-5 py-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                YOUR BAG <span className="text-acid">[{lines.length}]</span>
              </p>
              <button
                type="button"
                data-testid="cart-drawer-close"
                aria-label="Close bag"
                onClick={() => setCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-cream/25 transition-colors hover:border-acid hover:text-acid"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-heading text-2xl font-bold uppercase tracking-tighter">
                  YOUR BAG IS EMPTY.
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-cream/50">
                  THE SYSTEM IS DISAPPOINTED.
                </p>
                <Link
                  to="/shop"
                  data-testid="cart-empty-shop-button"
                  onClick={() => setCartOpen(false)}
                  className="mt-2 inline-block border-2 border-acid bg-acid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-shadow hover:shadow-[4px_4px_0_#E52A1B]"
                >
                  SHOP THE DROP
                </Link>
              </div>
            ) : (
              <>
                {/* free shipping progress */}
                <div
                  className="border-b border-cream/15 px-5 py-3"
                  data-testid="cart-shipping-progress"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/80">
                    {remaining > 0 ? (
                      <>
                        <span className="text-acid">{inr(remaining)}</span> AWAY
                        FROM FREE SHIPPING
                      </>
                    ) : (
                      <span className="text-acid">
                        FREE SHIPPING UNLOCKED. THE SYSTEM PROVIDES.
                      </span>
                    )}
                  </p>
                  <div className="mt-2 h-2 border border-cream/25 bg-white/5">
                    <div
                      className="h-full bg-acid transition-[width] duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* lines */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="space-y-4">
                    {lines.map((line) => {
                      const product = getProductById(line.productId);
                      if (!product) return null;
                      const lineKey = `${line.productId}-${line.size}`;
                      return (
                        <li
                          key={lineKey}
                          data-testid={`cart-line-${lineKey}`}
                          className="flex gap-3 border border-cream/15 bg-white/[0.03] p-3"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            loading="lazy"
                            className="h-24 w-18 shrink-0 border border-cream/20 object-cover"
                            style={{ width: "4.5rem" }}
                          />
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-heading text-sm font-bold uppercase leading-tight tracking-tight">
                                  {product.name}
                                </p>
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/50">
                                  {product.category.replace("-", " ")} // SIZE:{" "}
                                  {line.size}
                                </p>
                              </div>
                              <button
                                type="button"
                                data-testid={`cart-remove-${lineKey}`}
                                aria-label={`Remove ${product.name}`}
                                onClick={() => removeLine(line.productId, line.size)}
                                className="text-cream/50 transition-colors hover:text-signal"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center border border-cream/25">
                                <button
                                  type="button"
                                  data-testid={`cart-qty-minus-${lineKey}`}
                                  aria-label="Decrease quantity"
                                  onClick={() =>
                                    updateQty(line.productId, line.size, line.qty - 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center hover:bg-cream/10"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span
                                  data-testid={`cart-qty-${lineKey}`}
                                  className="w-8 text-center font-mono text-xs font-bold"
                                >
                                  {line.qty}
                                </span>
                                <button
                                  type="button"
                                  data-testid={`cart-qty-plus-${lineKey}`}
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    updateQty(line.productId, line.size, line.qty + 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center hover:bg-cream/10"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <p className="font-mono text-sm font-bold">
                                {inr(product.price * line.qty)}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* footer */}
                <div className="border-t border-cream/15 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream/60">
                      SUBTOTAL
                    </span>
                    <span
                      data-testid="cart-subtotal"
                      className="font-mono text-lg font-bold"
                    >
                      {inr(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/40">
                    TAXES INCLUDED (UNFORTUNATELY). SHIPPING CALCULATED AT
                    CHECKOUT.
                  </p>
                  <Link
                    to="/checkout"
                    data-testid="cart-checkout-button"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 flex w-full items-center justify-center border-2 border-acid bg-acid px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.16em] text-ink transition-shadow hover:shadow-[4px_4px_0_#E52A1B]"
                  >
                    CHECKOUT →
                  </Link>
                  <button
                    type="button"
                    data-testid="cart-continue-button"
                    onClick={() => setCartOpen(false)}
                    className="mt-3 w-full text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50 underline-offset-4 hover:text-cream hover:underline"
                  >
                    or keep questioning
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
