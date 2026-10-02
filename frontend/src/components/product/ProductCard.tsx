import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/store";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import QuickAddModal from "@/components/product/QuickAddModal";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addLine, setCartOpen, toggleWishlist, isWishlisted } = useCart();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const soldOut = product.stock === 0;
  const lowStock = !soldOut && product.stock <= 12;
  const oneSize = product.sizes.length === 1;
  const hoverImage = product.images.length > 1 ? product.images[1] : null;

  const onQuickAdd = () => {
    if (soldOut) return;
    if (oneSize) {
      addLine(product.id, product.sizes[0], 1);
      setCartOpen(true);
    } else {
      setQuickAddOpen(true);
    }
  };

  return (
    <article
      data-testid={`product-card-${product.slug}`}
      className={cn(
        "group relative flex flex-col border-2 border-ink bg-panel transition-shadow duration-300 hover:shadow-hard",
        className,
      )}
    >
      <Link
        to={`/product/${product.slug}`}
        data-testid={`product-card-link-${product.slug}`}
        aria-label={product.name}
        className="relative block aspect-[3/4] overflow-hidden border-b-2 border-ink"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.04]",
            hoverImage && "group-hover:opacity-0",
            soldOut && "grayscale",
          )}
        />
        {hoverImage && (
          <img
            src={hoverImage}
            alt=""
            loading="lazy"
            aria-hidden
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-center opacity-0 transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
          />
        )}

        {/* badges */}
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1.5">
          {product.isLimited && (
            <span className="border-2 border-ink bg-signal px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
              LIMITED
            </span>
          )}
          {lowStock && (
            <span
              data-testid={`product-card-stock-${product.slug}`}
              className="border-2 border-ink bg-acid px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink"
            >
              {product.stock} LEFT
            </span>
          )}
          {product.isNew && (
            <span className="border-2 border-ink bg-ink px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-cream">
              NEW
            </span>
          )}
        </div>

        {/* sold out */}
        {soldOut && (
          <div className="diag-stripes absolute inset-0 flex items-center justify-center bg-cream/40">
            <span className="stamp border-signal text-signal">SOLD OUT</span>
          </div>
        )}

        {/* wishlist */}
        <button
          type="button"
          data-testid={`product-card-wishlist-${product.slug}`}
          aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted(product.id)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={cn(
            "absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center border-2 border-ink bg-cream transition-all duration-200 hover:bg-acid active:translate-y-0.5",
            isWishlisted(product.id) && "bg-signal text-white hover:bg-signal",
          )}
        >
          <Heart
            className="h-4 w-4"
            strokeWidth={2.25}
            fill={isWishlisted(product.id) ? "currentColor" : "none"}
          />
        </button>
      </Link>

      {/* info row */}
      <div className="flex flex-1 items-stretch justify-between gap-2 p-3">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-sm font-bold uppercase leading-tight tracking-tight">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">
            {product.category.replace("-", " ")} // {product.type}
          </p>
          <p className="mt-1.5 font-mono text-sm font-bold tracking-tight">
            {soldOut ? (
              <span className="text-smoke">{inr(product.price)}</span>
            ) : (
              <>
                {inr(product.price)}
                {product.mrp && (
                  <span className="ml-2 text-xs font-normal text-smoke line-through">
                    {inr(product.mrp)}
                  </span>
                )}
              </>
            )}
          </p>
        </div>

        {/* quick add */}
        <button
          type="button"
          data-testid={`product-card-quick-add-${product.slug}`}
          aria-label={soldOut ? "Sold out" : `Quick add ${product.name}`}
          disabled={soldOut}
          onClick={onQuickAdd}
          className={cn(
            "self-end border-2 border-ink px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-150 active:translate-y-0.5 active:shadow-none",
            soldOut
              ? "cursor-not-allowed border-smoke bg-sand text-smoke"
              : "bg-ink text-cream hover:bg-acid hover:text-ink hover:shadow-hard-sm",
          )}
        >
          {soldOut ? "—" : oneSize ? "+ ADD" : "+ QUICK ADD"}
        </button>
      </div>

      {!oneSize && (
        <QuickAddModal
          product={product}
          open={quickAddOpen}
          onOpenChange={setQuickAddOpen}
        />
      )}
    </article>
  );
}
