import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { getProductById, FREE_SHIPPING_THRESHOLD } from "@/data/products";
import { useCart } from "@/lib/store";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";

type PayMethod = "upi" | "card";

const SHIPPING_FEE = 79;

export default function Checkout() {
  const { lines, subtotal, clearCart } = useCart();
  const [method, setMethod] = useState<PayMethod>("upi");
  const [processing, setProcessing] = useState(false);
  const [orderNo, setOrderNo] = useState<string | null>(null);
  const [paidTotal, setPaidTotal] = useState<number | null>(null);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const pay = () => {
    if (processing) return;
    setProcessing(true);
    const paid = total; // capture before the cart is cleared
    window.setTimeout(() => {
      setOrderNo(`PND-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      setPaidTotal(paid);
      clearCart();
      setProcessing(false);
      window.scrollTo(0, 0);
    }, 1400);
  };

  const linesView = useMemo(
    () =>
      lines
        .map((l) => ({ line: l, product: getProductById(l.productId) }))
        .filter((x): x is { line: typeof x.line; product: NonNullable<typeof x.product> } =>
          Boolean(x.product),
        ),
    [lines],
  );

  /* ---------- order confirmed ---------- */
  if (orderNo) {
    return (
      <div
        data-testid="order-confirmed"
        className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center md:py-24"
      >
        <span className="stamp border-[#1B873F] text-2xl text-[#1B873F]">
          ORDER CONFIRMED
        </span>
        <h1 className="mt-8 font-heading text-4xl font-bold uppercase leading-[0.9] tracking-tighter md:text-6xl">
          THE SYSTEM
          <br />
          ACCEPTED YOUR
          <br />
          MONEY<span className="text-signal">.</span>
        </h1>
        <div className="mt-8 w-full max-w-md border-2 border-ink bg-panel text-left font-mono text-xs uppercase tracking-[0.14em]">
          <div className="flex justify-between border-b border-ink/20 px-4 py-3">
            <span className="text-smoke">ORDER NO.</span>
            <span data-testid="order-number" className="font-bold">{orderNo}</span>
          </div>
          <div className="flex justify-between border-b border-ink/20 px-4 py-3">
            <span className="text-smoke">PAID</span>
            <span data-testid="order-paid" className="font-bold">{inr(paidTotal ?? total)}</span>
          </div>
          <div className="flex justify-between border-b border-ink/20 px-4 py-3">
            <span className="text-smoke">CONFIRMATION SENT TO</span>
            <span className="font-bold">YOUR INBOX (EVENTUALLY)</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-smoke">ESTIMATED DELIVERY</span>
            <span className="font-bold text-signal">3–5 DAYS (ACTUAL: 2037)</span>
          </div>
        </div>
        <p className="mt-6 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-smoke">
          YOUR ORDER HAS BEEN DISPATCHED VIA SPEED POST & PRAYERS. TRACKING
          WILL BEGIN TRACKING SHORTLY.
        </p>
        <Link
          to="/shop"
          data-testid="checkout-continue-shopping"
          className="mt-8 border-2 border-ink bg-ink px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-acid hover:text-ink"
        >
          CONTINUE QUESTIONING
        </Link>
      </div>
    );
  }

  /* ---------- empty bag ---------- */
  if (linesView.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
          ERR 422 // SYS.CHECKOUT
        </p>
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tighter md:text-5xl">
          NOTHING TO CHECKOUT
        </h1>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-smoke">
          YOUR BAG IS EMPTY. THE SYSTEM CANNOT PROCESS A FEELING.
        </p>
        <Link
          to="/shop"
          data-testid="checkout-empty-shop-link"
          className="border-2 border-ink bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-acid hover:text-ink"
        >
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  /* ---------- checkout ---------- */
  return (
    <div data-testid="checkout-root" className="mx-auto max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-smoke hover:text-signal"
        data-testid="checkout-back-link"
      >
        <ArrowLeft className="h-4 w-4" />
        BACK TO SHOP
      </Link>
      <h1 className="mt-4 font-heading text-4xl font-bold uppercase leading-none tracking-tighter md:text-6xl">
        CHECKOUT
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
        DEMO MODE // NO REAL MONEY WILL BE HARMED
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* form side */}
        <div>
          <section className="border-2 border-ink bg-panel p-5 md:p-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              01 // SHIPPING DETAILS
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                defaultValue="Arjun Sharma"
                aria-label="Full name"
                data-testid="checkout-input-name"
                placeholder="FULL NAME"
                className="border-2 border-ink bg-cream px-4 py-3 font-mono text-sm placeholder:text-smoke/60 focus:bg-white focus:outline-none"
              />
              <input
                defaultValue="arjun@question-everything.in"
                aria-label="Email"
                data-testid="checkout-input-email"
                placeholder="EMAIL"
                className="border-2 border-ink bg-cream px-4 py-3 font-mono text-sm placeholder:text-smoke/60 focus:bg-white focus:outline-none"
              />
              <textarea
                defaultValue="Flat 4B, Pending Hostel, Lane 3, Bengaluru 560001"
                aria-label="Address"
                data-testid="checkout-input-address"
                placeholder="ADDRESS"
                rows={2}
                className="resize-none border-2 border-ink bg-cream px-4 py-3 font-mono text-sm placeholder:text-smoke/60 focus:bg-white focus:outline-none sm:col-span-2"
              />
            </div>
          </section>

          <section className="mt-6 border-2 border-ink bg-panel p-5 md:p-6">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              02 // PAYMENT METHOD
            </p>
            <div className="mt-4 grid grid-cols-2 gap-px border-2 border-ink bg-ink">
              {(
                [
                  { id: "upi", label: "UPI" },
                  { id: "card", label: "CARD" },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  data-testid={`payment-tab-${m.id}`}
                  aria-pressed={method === m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors",
                    method === m.id ? "bg-ink text-cream" : "bg-cream hover:bg-sand",
                  )}
                >
                  {m.label}
                  {method === m.id && <Check className="ml-2 inline h-3.5 w-3.5" />}
                </button>
              ))}
            </div>

            {method === "upi" ? (
              <div className="mt-4">
                <input
                  defaultValue="arjun@questionable-bank"
                  aria-label="UPI ID"
                  data-testid="checkout-input-upi"
                  placeholder="yourname@bank"
                  className="w-full border-2 border-ink bg-cream px-4 py-3 font-mono text-sm focus:bg-white focus:outline-none"
                />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
                  DEMO UPI. THE MONEY STAYS EXACTLY WHERE IT IS. LUCKY YOU.
                </p>
              </div>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  defaultValue="4111 1111 1111 1111"
                  aria-label="Card number"
                  data-testid="checkout-input-card"
                  placeholder="CARD NUMBER"
                  className="border-2 border-ink bg-cream px-4 py-3 font-mono text-sm focus:bg-white focus:outline-none sm:col-span-2"
                />
                <input
                  defaultValue="12/29"
                  aria-label="Card expiry"
                  placeholder="MM/YY"
                  className="border-2 border-ink bg-cream px-4 py-3 font-mono text-sm focus:bg-white focus:outline-none"
                />
                <input
                  defaultValue="123"
                  aria-label="Card CVV"
                  placeholder="CVV"
                  type="password"
                  className="border-2 border-ink bg-cream px-4 py-3 font-mono text-sm focus:bg-white focus:outline-none"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke sm:col-span-2">
                  DEMO CARD. DECLINED NOWHERE, CHARGED NOWHERE.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* summary side */}
        <aside>
          <div className="sticky top-32 border-2 border-ink bg-panel">
            <p className="border-b-2 border-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              03 // ORDER SUMMARY
            </p>
            <ul className="max-h-72 overflow-y-auto px-5 py-4">
              {linesView.map(({ line, product }) => (
                <li
                  key={`${line.productId}-${line.size}`}
                  data-testid={`checkout-line-${product.slug}`}
                  className="flex items-center gap-3 border-b border-ink/10 py-3 last:border-0"
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    loading="lazy"
                    className="h-14 w-12 border border-ink object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-xs font-bold uppercase tracking-tight">
                      {product.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
                      {line.size} × {line.qty}
                    </p>
                  </div>
                  <p className="font-mono text-xs font-bold">
                    {inr(product.price * line.qty)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t-2 border-ink px-5 py-4 font-mono text-xs uppercase tracking-[0.14em]">
              <div className="flex justify-between">
                <span className="text-smoke">SUBTOTAL</span>
                <span data-testid="checkout-subtotal">{inr(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-smoke">SHIPPING</span>
                <span data-testid="checkout-shipping">
                  {shipping === 0 ? "FREE" : inr(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-ink/20 pt-3 text-base font-bold">
                <span>TOTAL</span>
                <span data-testid="checkout-total">{inr(total)}</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                type="button"
                data-testid="pay-button"
                onClick={pay}
                disabled={processing}
                className={cn(
                  "w-full border-2 border-acid py-4 font-mono text-sm font-bold uppercase tracking-[0.16em] transition-all active:translate-y-0.5",
                  processing ? "cursor-wait bg-sand text-smoke" : "bg-acid text-ink hover:shadow-[4px_4px_0_#E52A1B]",
                )}
              >
                {processing ? "PROCESSING..." : `PAY ${inr(total)}`}
              </button>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
                TAXES INCLUDED (UNFORTUNATELY). DEMO CHECKOUT — NOTHING IS
                ACTUALLY CHARGED.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
