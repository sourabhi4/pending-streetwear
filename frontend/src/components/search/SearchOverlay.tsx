import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/lib/store";
import { inr } from "@/lib/format";

const SUGGESTIONS = ["scam", "404", "jugaad", "meeting", "oversized"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useCart();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // reset + focus on open
  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) =>
      [p.name, p.category, p.type, p.story, p.description, p.keywords ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q),
    ).slice(0, 8);
  }, [query]);

  const go = (slug: string) => {
    setSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-2xl"
          data-testid="search-overlay"
          role="dialog"
          aria-label="Search"
        >
          <div className="mx-auto flex h-full max-w-3xl flex-col px-4 pt-[12vh] md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
              className="flex items-center justify-between gap-3"
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-acid">
                SEARCH // THE SYSTEM
              </p>
              <button
                type="button"
                data-testid="search-close"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-white/25 text-cream transition-colors hover:border-acid hover:text-acid"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>

            <div className="mt-4 flex items-center gap-3 border-2 border-acid bg-black/60 px-4">
              <Search className="h-5 w-5 shrink-0 text-acid" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the system..."
                data-testid="search-input"
                aria-label="Search products"
                className="w-full bg-transparent py-4 font-mono text-lg text-cream placeholder:text-cream/35 focus:outline-none"
              />
              <span className="cursor-blink font-mono text-acid">▌</span>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto pb-16">
              {query.trim() === "" ? (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">
                    SUGGESTED QUERIES
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        data-testid={`search-suggestion-${s.replace(/\s+/g, "-")}`}
                        onClick={() => setQuery(s)}
                        className="border border-white/25 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-cream/80 transition-colors hover:border-acid hover:text-acid"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p
                  data-testid="search-empty"
                  className="py-8 text-center font-mono text-sm uppercase tracking-[0.16em] text-cream/50"
                >
                  NOTHING FOUND IN THE SYSTEM. TRY "SCAM".
                </p>
              ) : (
                <ul className="divide-y divide-white/10 border border-white/15">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        data-testid={`search-result-${p.slug}`}
                        onClick={() => go(p.slug)}
                        className="flex w-full items-center gap-4 px-3 py-3 text-left transition-colors hover:bg-acid/10"
                      >
                        <img
                          src={p.images[0]}
                          alt=""
                          loading="lazy"
                          className="h-14 w-12 shrink-0 border border-white/20 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-heading text-sm font-bold uppercase tracking-tight text-cream">
                            {p.name}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/50">
                            {p.category.replace("-", " ")} // {p.type}
                          </p>
                        </div>
                        <p className="font-mono text-sm font-bold text-cream">
                          {p.stock === 0 ? "SOLD OUT" : inr(p.price)}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
