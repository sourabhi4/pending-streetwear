import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { CATEGORIES, PRODUCTS } from "@/data/products";

const ACCENT_CHIP: Record<Category["accent"], string> = {
  signal: "bg-signal text-white",
  acid: "bg-acid text-ink",
  ink: "bg-ink text-cream",
  smoke: "bg-smoke text-cream",
};

export default function CategorySystemNav() {
  return (
    <section data-testid="category-nav-section" className="border-b-2 border-ink py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              SYS.INDEX // 5 DIRECTORIES
            </p>
            <h2 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-tighter md:text-6xl">
              PICK YOUR POISON
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-smoke">
            FIVE FOLDERS OF FAILURE. ALL OF THEM WEARABLE.
          </p>
        </div>

        <div className="mt-8 border-t-2 border-ink">
          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                to={`/shop/${cat.slug}`}
                data-testid={`category-card-${cat.slug}`}
                className="group flex items-center gap-4 border-b-2 border-ink py-6 transition-colors duration-200 hover:bg-ink md:gap-8 md:py-8"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink font-mono text-xs font-bold transition-colors md:h-14 md:w-14 md:text-sm ${ACCENT_CHIP[cat.accent]}`}
                >
                  {cat.index}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-2xl font-bold uppercase leading-none tracking-tighter transition-colors group-hover:text-cream md:text-5xl">
                    {cat.label}
                  </h3>
                  <p className="mt-1.5 truncate text-sm font-medium text-[#5C5A54] transition-colors group-hover:text-cream/60 md:text-base">
                    {cat.tagline}
                  </p>
                </div>
                <div className="hidden shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-smoke transition-colors group-hover:text-cream/50 md:block">
                  {cat.description && <p className="max-w-xs">{cat.description}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-3 md:gap-5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-smoke transition-colors group-hover:text-acid">
                    {count} ITEMS
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center border-2 border-ink transition-all duration-200 group-hover:border-acid group-hover:bg-acid group-hover:text-ink md:h-12 md:w-12">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45 md:h-5 md:w-5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
