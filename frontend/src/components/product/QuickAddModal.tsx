import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/store";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";

interface QuickAddModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuickAddModal({ product, open, onOpenChange }: QuickAddModalProps) {
  const [size, setSize] = useState<string | null>(null);
  const { addLine, setCartOpen } = useCart();

  const add = () => {
    if (!size) return;
    addLine(product.id, size, 1);
    onOpenChange(false);
    setSize(null);
    setCartOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md gap-0 border-2 border-ink bg-cream p-0"
        data-testid="quick-add-modal"
      >
        <div className="flex items-stretch border-b-2 border-ink">
          <img
            src={product.images[0]}
            alt=""
            className="h-24 w-20 shrink-0 border-r-2 border-ink object-cover"
          />
          <div className="flex flex-1 flex-col justify-between p-3">
            <DialogTitle className="font-heading text-base font-bold uppercase leading-tight tracking-tight">
              {product.name}
            </DialogTitle>
            <p className="font-mono text-xs font-bold">{inr(product.price)}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-smoke">
            SELECT SIZE
          </p>
          <div className="mt-2 grid grid-cols-6 gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                data-testid={`quick-add-size-${s}`}
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={cn(
                  "border-2 border-ink py-2 font-mono text-xs font-bold transition-colors",
                  size === s ? "bg-ink text-cream" : "bg-cream hover:bg-sand",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            data-testid="quick-add-confirm-button"
            disabled={!size}
            onClick={add}
            className={cn(
              "mt-4 w-full border-2 border-ink py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all",
              size
                ? "bg-ink text-cream hover:bg-acid hover:text-ink hover:shadow-hard-sm active:translate-y-0.5"
                : "cursor-not-allowed bg-sand text-smoke",
            )}
          >
            {size ? `ADD TO BAG — ${inr(product.price)}` : "SELECT A SIZE FIRST"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
