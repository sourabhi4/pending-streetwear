import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PRODUCTS, PRODUCT_TYPES, SIZES } from "@/data/products";
import type { CategorySlug } from "@/lib/types";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/product/ProductCard";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc";
type Availability = "all" | "in" | "out";

const PRICE_BANDS = [
  { id: "under-1500", label: "UNDER \u20B91,500", test: (p: number) => p < 1500 },
  { id: "1500-1799", label: "\u20B91,500 \u2013 \u20B91,799", test: (p: number) => p >= 1500 && p <= 1799 },
  { id: "1800-plus", label: "\u20B91,800+", test: (p: number) => p >= 1800 },
] as const;

const SORT_LABELS: Record<SortKey, string> = {
  featured: "FEATURED",
  newest: "NEWEST",
  "price-asc": "PRICE: LOW \u2192 HIGH",
  "price-desc": "PRICE: HIGH \u2192 LOW",
};

const SIZE_FACETS = [...SIZES, "ONE SIZE"];

export default function Shop() {
  const { category } = useParams<{ category?: string }>();

  const validCategory = CATEGORIES.some((c) => c.slug === category)
    ? (category as CategorySlug)
    : null;

  const [categoryFilter, setCategoryFilter] = useState<CategorySlug | null>(validCategory);
  const [types, setTypes] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [bands, setBands] = useState<string[]>([]);
  const [availability, setAvailability] = useState<Availability>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // keep the filter in sync with /shop/:category
  useEffect(() => {
    setCategoryFilter(validCategory);
  }, [validCategory]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (bands.length) {
        const band = PRICE_BANDS.find((b) => b.id === bands[0]);
        if (band && !band.test(p.price)) return false;
      }
      if (availability === "in" && p.stock === 0) return false;
      if (availability === "out" && p.stock > 0) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.addedAt - a.addedAt;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return (
            Number(b.featured ?? false) - Number(a.featured ?? false) || a.addedAt - b.addedAt
          );
      }
    });

    return list;
  }, [categoryFilter, types, sizes, bands, availability, sort]);

  const activeCategory = CATEGORIES.find((c) => c.slug === categoryFilter);
  const anyFilter =
    categoryFilter !== null || types.length > 0 || sizes.length > 0 || bands.length > 0 || availability !== "all";

  const reset = () => {
    setCategoryFilter(null);
    setTypes([]);
    setSizes([]);
    setBands([]);
    setAvailability("all");
    setSort("featured");
  };

  const chip = (active: boolean) =>
    cn(
      "border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
      active ? "bg-ink text-cream" : "bg-cream text-ink hover:bg-sand",
    );

  const filterPanel = (
    <div className="space-y-7" data-testid="shop-filters">
      {/* category */}
      <fieldset>
        <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
          CATEGORY
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            data-testid="filter-category-all"
            aria-pressed={categoryFilter === null}
            onClick={() => setCategoryFilter(null)}
            className={chip(categoryFilter === null)}
          >
            ALL
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              data-testid={`filter-category-${c.slug}`}
              aria-pressed={categoryFilter === c.slug}
              onClick={() => setCategoryFilter(c.slug)}
              className={chip(categoryFilter === c.slug)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* product type */}
      <fieldset>
        <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
          PRODUCT TYPE
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRODUCT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              data-testid={`filter-type-${t.toLowerCase().replace(/\s+/g, "-")}`}
              aria-pressed={types.includes(t)}
              onClick={() => toggle(types, setTypes, t)}
              className={chip(types.includes(t))}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </fieldset>

      {/* size */}
      <fieldset>
        <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
          SIZE
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIZE_FACETS.map((s) => (
            <button
              key={s}
              type="button"
              data-testid={`filter-size-${s.toLowerCase()}`}
              aria-pressed={sizes.includes(s)}
              onClick={() => toggle(sizes, setSizes, s)}
              className={cn(chip(sizes.includes(s)), "min-w-10 text-center")}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      {/* price */}
      <fieldset>
        <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
          PRICE
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRICE_BANDS.map((b) => (
            <button
              key={b.id}
              type="button"
              data-testid={`filter-price-${b.id}`}
              aria-pressed={bands.includes(b.id)}
              onClick={() => setBands(bands.includes(b.id) ? [] : [b.id])}
              className={chip(bands.includes(b.id))}
            >
              {b.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* availability */}
      <fieldset>
        <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
          AVAILABILITY
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              { id: "all", label: "ALL" },
              { id: "in", label: "IN STOCK" },
              { id: "out", label: "SOLD OUT" },
            ] as const
          ).map((a) => (
            <button
              key={a.id}
              type="button"
              data-testid={`filter-availability-${a.id}`}
              aria-pressed={availability === a.id}
              onClick={() => setAvailability(a.id)}
              className={chip(availability === a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </fieldset>

      {anyFilter && (
        <button
          type="button"
          data-testid="shop-reset-filters"
          onClick={reset}
          className="flex items-center gap-2 border-2 border-signal px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-signal transition-colors hover:bg-signal hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          RESET FILTERS
        </button>
      )}
    </div>
  );

  return (
    <div data-testid="shop-root" className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            SYS.SHOP // {activeCategory ? `DIR.${activeCategory.index}` : "ALL DIRECTORIES"}
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-tighter md:text-6xl">
            {activeCategory ? activeCategory.label : "THE WHOLE SYSTEM"}
          </h1>
          <p className="mt-2 max-w-md text-base font-medium text-[#5C5A54]">
            {activeCategory
              ? activeCategory.description
              : "Every product in the archive of everyday absurdity. Filter responsibly."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              data-testid="sort-select"
              aria-label="Sort products"
              className="appearance-none border-2 border-ink bg-cream py-2.5 pl-4 pr-10 font-mono text-[11px] font-bold uppercase tracking-[0.14em] focus:outline-none"
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                <option key={k} value={k}>
                  {SORT_LABELS[k]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>

          {/* mobile filter toggle */}
          <button
            type="button"
            data-testid="mobile-filters-toggle"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 border-2 border-ink bg-ink px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-cream lg:hidden"
          >
            {filtersOpen ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            FILTERS
          </button>
        </div>
      </div>

      {/* mobile filter panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-6 border-2 border-ink bg-panel p-4">{filterPanel}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* desktop filter rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 border-2 border-ink bg-panel p-5">{filterPanel}</div>
        </aside>

        {/* results */}
        <div>
          <p
            data-testid="shop-product-count"
            className="border-b-2 border-ink pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-smoke"
          >
            {results.length} PRODUCT{results.length === 1 ? "" : "S"} FOUND //{" "}
            {anyFilter ? "FILTERED VIEW" : "UNFILTERED CHAOS"}
          </p>

          {results.length === 0 ? (
            <div
              data-testid="shop-empty"
              className="mt-10 flex flex-col items-center gap-4 border-2 border-dashed border-smoke/50 px-6 py-16 text-center"
            >
              <p className="font-heading text-3xl font-bold uppercase tracking-tighter">
                0 RESULTS FOUND
              </p>
              <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-smoke">
                THE SYSTEM RETURNED NOTHING. TYPICAL. ADJUST YOUR EXPECTATIONS
                OR YOUR FILTERS.
              </p>
              <button
                type="button"
                data-testid="shop-empty-reset"
                onClick={reset}
                className="mt-2 border-2 border-ink bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-acid hover:text-ink"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div
              data-testid="product-grid"
              className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
            >
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-smoke">
            END OF RESULTS. THE SYSTEM REFUSES TO LOAD MORE. —{" "}
            <Link to="/" className="underline underline-offset-4 hover:text-signal">
              RETURN HOME
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
