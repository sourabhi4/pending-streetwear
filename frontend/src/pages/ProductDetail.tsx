import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { getProduct, PRODUCTS } from "@/data/products";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/store";
import { inr } from "@/lib/format";
import { useCountdown } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const SIZE_CHART = [
  { size: "XS", chest: "38-40", length: "26" },
  { size: "S", chest: "40-42", length: "27" },
  { size: "M", chest: "42-44", length: "28" },
  { size: "L", chest: "44-46", length: "29" },
  { size: "XL", chest: "46-48", length: "30" },
  { size: "XXL", chest: "48-50", length: "31" },
] as const;

function CountdownChip({ iso }: { iso: string }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(iso);
  if (expired) {
    return (
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-signal">
        DROP CLOSED — ARCHIVED
      </span>
    );
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span
      data-testid="pdp-countdown"
      className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-signal"
    >
      DROP ENDS IN {pad(days)}D : {pad(hours)}H : {pad(minutes)}M : {pad(seconds)}S
    </span>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product: Product | undefined = slug ? getProduct(slug) : undefined;
  const navigate = useNavigate();
  const { addLine, setCartOpen } = useCart();

  const [imageIdx, setImageIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [qty, setQty] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);

  const related = useMemo(() => {
    if (!product) return [];
    const same = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
    const rest = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
    return [...same, ...rest].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-28 text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
          ERR 404 // SYS.PRODUCT
        </p>
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tighter md:text-6xl">
          PRODUCT NOT FOUND
        </h1>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-smoke">
          IT PROBABLY SOLD OUT. OR NEVER EXISTED. BOTH ARE ON-BRAND.
        </p>
        <Link
          to="/shop"
          data-testid="pdp-notfound-shop-link"
          className="border-2 border-ink bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-acid hover:text-ink"
        >
          BROWSE THE SHOP
        </Link>
      </div>
    );
  }

  const soldOut = product.stock === 0;

  const ensureSize = (): string | null => {
    const isOneSize = product.sizes.length === 1;
    const chosen = isOneSize ? product.sizes[0] : size;
    if (!isOneSize && !chosen) {
      setSizeError(true);
      toast.error("SIZE REQUIRED", {
        description: "The system needs a size before proceeding.",
      });
      return null;
    }
    return chosen;
  };

  const addToBag = (openDrawer = true) => {
    const chosen = ensureSize();
    if (!chosen) return;
    addLine(product.id, chosen, qty);
    if (openDrawer) setCartOpen(true);
    toast.success("ADDED TO BAG", {
      description: `${product.name} — ${chosen} × ${qty}`,
    });
  };

  const buyNow = () => {
    const chosen = ensureSize();
    if (!chosen) return;
    addLine(product.id, chosen, qty);
    navigate("/checkout");
  };

  const selectSize = (s: string) => {
    setSize(s);
    setSizeError(false);
  };

  return (
    <div data-testid="product-detail-root" className="pb-24 md:pb-0">
      <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-8 md:py-12">
        {/* breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-smoke"
        >
          <Link to="/shop" className="hover:text-signal">
            SHOP
          </Link>
          <span>/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-signal">
            {product.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* gallery */}
          <div>
            <div className="relative border-2 border-ink bg-panel">
              <img
                src={product.images[imageIdx]}
                alt={`${product.name} — view ${imageIdx + 1}`}
                data-testid="pdp-gallery-main"
                className={cn(
                  "aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.05]",
                  soldOut && "grayscale",
                )}
              />
              {product.isLimited && (
                <span className="absolute left-3 top-3 border-2 border-ink bg-signal px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                  LIMITED
                </span>
              )}
              {soldOut && (
                <div className="diag-stripes absolute inset-0 flex items-center justify-center bg-cream/40">
                  <span className="stamp border-signal text-2xl text-signal">SOLD OUT</span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    data-testid={`pdp-gallery-thumb-${i}`}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={imageIdx === i}
                    onClick={() => setImageIdx(i)}
                    className={cn(
                      "h-20 w-16 overflow-hidden border-2 transition-colors md:h-24 md:w-20",
                      imageIdx === i ? "border-signal" : "border-ink hover:border-smoke",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* purchase console */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              {product.category.replace("-", " ")} // {product.type}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-bold uppercase leading-[0.92] tracking-tighter md:text-6xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-baseline gap-3">
              <p data-testid="pdp-price" className="font-mono text-2xl font-bold tracking-tight">
                {inr(product.price)}
              </p>
              {product.mrp && (
                <p className="font-mono text-sm text-smoke line-through">{inr(product.mrp)}</p>
              )}
              <p
                data-testid="pdp-stock"
                className={cn(
                  "ml-auto font-mono text-[11px] font-bold uppercase tracking-[0.16em]",
                  soldOut ? "text-smoke" : product.stock <= 12 ? "text-signal" : "text-[#1B873F]",
                )}
              >
                {soldOut
                  ? "SOLD OUT"
                  : product.stock <= 12
                    ? `ONLY ${product.stock} LEFT`
                    : "IN STOCK"}
              </p>
            </div>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#5C5A54] md:text-lg">
              {product.description}
            </p>

            {product.isLimited && product.dropEndsAt && (
              <div className="mt-5 border-2 border-signal bg-signal/5 px-4 py-3">
                <CountdownChip iso={product.dropEndsAt} />
              </div>
            )}

            {/* color */}
            <div className="mt-7">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-smoke">
                COLOR: <span className="text-ink">{product.color.name}</span>
              </p>
              <div className="mt-2 flex gap-2">
                <span
                  data-testid="pdp-color-option"
                  className="flex h-9 w-9 items-center justify-center border-2 border-ink"
                  title={product.color.name}
                >
                  <span className="h-5 w-5" style={{ backgroundColor: product.color.hex }} />
                </span>
                <span className="flex items-center font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
                  1 OF 1 COLORWAY. MONOPOLY.
                </span>
              </div>
            </div>

            {/* size */}
            {product.sizes.length > 1 ? (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "font-mono text-[11px] font-bold uppercase tracking-[0.18em]",
                      sizeError ? "text-signal" : "text-smoke",
                    )}
                  >
                    {sizeError ? "SELECT A SIZE. THE SYSTEM INSISTS." : "SELECT SIZE"}
                  </p>
                  <button
                    type="button"
                    data-testid="size-guide-button"
                    onClick={() => setGuideOpen(true)}
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] underline underline-offset-4 hover:text-signal"
                  >
                    SIZE GUIDE
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-6 gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-testid={`size-option-${s}`}
                      aria-pressed={size === s}
                      onClick={() => selectSize(s)}
                      className={cn(
                        "border-2 py-2.5 font-mono text-xs font-bold transition-colors",
                        size === s
                          ? "border-ink bg-ink text-cream"
                          : "border-ink bg-cream hover:bg-sand",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 flex items-center justify-between">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-smoke">
                  SIZE: <span className="text-ink">{product.sizes[0]}</span>
                </p>
                <button
                  type="button"
                  data-testid="size-guide-button"
                  onClick={() => setGuideOpen(true)}
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] underline underline-offset-4 hover:text-signal"
                >
                  SIZE GUIDE
                </button>
              </div>
            )}

            {/* qty */}
            <div className="mt-6 flex items-center gap-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-smoke">
                QTY
              </p>
              <div className="flex items-center border-2 border-ink">
                <button
                  type="button"
                  data-testid="qty-minus"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center hover:bg-sand"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span data-testid="qty-value" className="w-10 text-center font-mono text-sm font-bold">
                  {qty}
                </span>
                <button
                  type="button"
                  data-testid="qty-plus"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  className="flex h-10 w-10 items-center justify-center hover:bg-sand"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                data-testid="add-to-bag-button"
                disabled={soldOut}
                onClick={() => addToBag(true)}
                className={cn(
                  "border-2 border-ink px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all duration-150 active:translate-y-0.5 active:shadow-none",
                  soldOut
                    ? "cursor-not-allowed bg-sand text-smoke"
                    : "bg-ink text-cream hover:bg-acid hover:text-ink hover:shadow-hard",
                )}
              >
                {soldOut ? "SOLD OUT" : "ADD TO BAG"}
              </button>
              <button
                type="button"
                data-testid="buy-now-button"
                disabled={soldOut}
                onClick={buyNow}
                className={cn(
                  "border-2 border-ink px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all duration-150 active:translate-y-0.5 active:shadow-none",
                  soldOut
                    ? "cursor-not-allowed bg-sand text-smoke"
                    : "bg-signal text-white hover:bg-ink hover:text-cream",
                )}
              >
                BUY NOW
              </button>
            </div>

            {/* story */}
            <div className="mt-8 border-l-2 border-signal pl-4" data-testid="pdp-story">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
                STORY //
              </p>
              <p className="mt-2 font-mono text-sm leading-relaxed text-ink/80">
                "{product.story}"
              </p>
            </div>

            {/* details + shipping */}
            <div className="mt-8 grid gap-px border-2 border-ink bg-ink sm:grid-cols-2">
              <div className="bg-cream p-5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  DETAILS
                </p>
                <ul className="mt-3 space-y-1.5 font-mono text-xs uppercase tracking-[0.1em] text-ink/75">
                  <li>— {product.gsm > 0 ? `${product.gsm} GSM cotton` : "Premium material"}</li>
                  <li>— {product.fit}</li>
                  <li>— Screen printed</li>
                  <li>— Unisex</li>
                  <li>— Made in India</li>
                </ul>
              </div>
              <div className="bg-cream p-5">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  SHIPPING
                </p>
                <ul className="mt-3 space-y-1.5 font-mono text-xs uppercase tracking-[0.1em] text-ink/75">
                  <li>— Ships within 3–5 business days</li>
                  <li>— Free shipping above ₹1,999</li>
                  <li>— Dispatched via speed post & prayers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* related */}
        <div className="mt-14 md:mt-20" data-testid="related-products">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
                SYS.RELATED // ALSO UNDER REVIEW
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tighter md:text-5xl">
                QUESTION ALSO
              </h2>
            </div>
            <Link
              to={`/shop/${product.category}`}
              className="hidden border-2 border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-cream sm:block"
            >
              MORE {product.category.replace("-", " ").toUpperCase()}
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* mobile sticky buy bar */}
      {!soldOut && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-cream/95 px-4 py-3 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold uppercase tracking-tight">
                {product.name}
              </p>
              <p className="font-mono text-xs font-bold">{inr(product.price)}</p>
            </div>
            <button
              type="button"
              data-testid="mobile-add-to-bag-bar"
              onClick={() => addToBag(true)}
              className="ml-auto shrink-0 border-2 border-ink bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream active:translate-y-0.5"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      )}

      {/* size guide dialog */}
      <Dialog open={guideOpen} onOpenChange={setGuideOpen}>
        <DialogContent
          className="max-w-lg border-2 border-ink bg-cream p-0"
          data-testid="size-guide-dialog"
        >
          <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3">
            <DialogTitle className="font-heading text-lg font-bold uppercase tracking-tighter">
              SIZE GUIDE
            </DialogTitle>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">
              MEASURED IN INCHES
            </span>
          </div>
          <div className="p-5">
            <table className="w-full border-2 border-ink text-left font-mono text-xs">
              <thead>
                <tr className="bg-ink text-cream">
                  <th className="px-3 py-2 font-bold uppercase tracking-[0.14em]">SIZE</th>
                  <th className="px-3 py-2 font-bold uppercase tracking-[0.14em]">CHEST (IN)</th>
                  <th className="px-3 py-2 font-bold uppercase tracking-[0.14em]">LENGTH (IN)</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-t-2 border-ink">
                    <td className="px-3 py-2 font-bold">{row.size}</td>
                    <td className="px-3 py-2">{row.chest}</td>
                    <td className="px-3 py-2">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 flex items-start gap-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-smoke">
              <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              OVERSIZED FIT: BETWEEN SIZES? SIZE DOWN, UNLESS YOU'RE ALSO BETWEEN
              OPINIONS.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
