import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ARCHIVE_DROPS } from "@/data/products";
import { cn } from "@/lib/utils";

export default function ArchivePage() {
  const [openId, setOpenId] = useState<string | null>("drop-001");

  return (
    <div data-testid="archive-root" className="mx-auto max-w-[1600px] px-4 py-10 md:px-8 md:py-14">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            SYS.ARCHIVE // READ-ONLY RECORDS
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-tighter md:text-6xl">
            THE ARCHIVE
          </h1>
          <p className="mt-2 max-w-md text-base font-medium text-[#5C5A54]">
            Dead drops, preserved for the record. Sold out means sold out. We
            do not believe in restocks.
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-smoke">
          4 RECORDS / 500 UNITS / 0 RESTOCKS
        </p>
      </div>

      {/* records */}
      <div className="mt-8 border-t-2 border-ink">
        {ARCHIVE_DROPS.map((drop) => {
          const open = openId === drop.id;
          return (
            <article key={drop.id} className="border-b-2 border-ink">
              <button
                type="button"
                data-testid={`archive-row-toggle-${drop.no}`}
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : drop.id)}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-1 py-5 text-left transition-colors hover:bg-panel md:grid-cols-[7rem_1fr_8rem_7rem_9rem_3rem] md:gap-6 md:px-2"
              >
                <span className="font-mono text-xs font-bold tracking-[0.14em] text-smoke">
                  DROP_{drop.no}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-heading text-lg font-bold uppercase tracking-tight md:text-2xl">
                    {drop.title}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-smoke md:hidden">
                    {drop.closedAt} // {drop.units} UNITS
                  </span>
                </span>
                <span className="hidden text-left font-mono text-[11px] uppercase tracking-[0.16em] text-smoke md:block">
                  {drop.units} UNITS
                </span>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-smoke md:block">
                  {drop.closedAt}
                </span>
                <span className="stamp hidden justify-self-start border-signal text-xs text-signal md:inline-block">
                  SOLD OUT
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 justify-self-end transition-transform duration-200",
                    open && "rotate-180",
                  )}
                />
              </button>

              {open && (
                <div
                  data-testid={`archive-detail-${drop.no}`}
                  className="grid gap-6 border-t border-ink/15 px-1 py-6 md:grid-cols-[220px_1fr] md:px-2"
                >
                  <img
                    src={drop.image}
                    alt={`DROP ${drop.no} — ${drop.title}`}
                    loading="lazy"
                    className="aspect-[3/4] w-full max-w-[220px] border-2 border-ink object-cover grayscale"
                  />
                  <div>
                    <p className="font-heading text-xl font-bold uppercase tracking-tight md:text-2xl">
                      {drop.subtitle}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5C5A54] md:text-base">
                      {drop.story}
                    </p>
                    <div className="mt-5 grid max-w-md grid-cols-3 gap-px border-2 border-ink bg-ink font-mono text-[11px] uppercase">
                      <div className="bg-panel p-3">
                        <p className="text-smoke">SOLD OUT IN</p>
                        <p className="mt-1 font-bold text-signal">{drop.soldOutIn}</p>
                      </div>
                      <div className="bg-panel p-3">
                        <p className="text-smoke">UNITS</p>
                        <p className="mt-1 font-bold">{drop.units}</p>
                      </div>
                      <div className="bg-panel p-3">
                        <p className="text-smoke">CLOSED</p>
                        <p className="mt-1 font-bold">{drop.closedAt}</p>
                      </div>
                    </div>
                    {drop.productSlug && (
                      <Link
                        to={`/product/${drop.productSlug}`}
                        data-testid={`archive-view-artifact-${drop.no}`}
                        className="group mt-5 inline-flex items-center gap-2 border-2 border-ink px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-cream"
                      >
                        VIEW THE ARTIFACT
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-10 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-smoke">
        RECORD RETENTION POLICY: FOREVER. RESTOCK POLICY: NEVER. THE ARCHIVE
        DOES NOT NEGOTIATE.
      </p>
    </div>
  );
}
