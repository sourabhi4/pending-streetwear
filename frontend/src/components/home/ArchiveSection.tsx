import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ARCHIVE_DROPS } from "@/data/products";

export default function ArchiveSection() {
  return (
    <section data-testid="archive-section" className="border-b-2 border-ink py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              SYS.ARCHIVE // READ-ONLY
            </p>
            <h2 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-tighter md:text-6xl">
              ARCHIVE
            </h2>
            <p className="mt-2 text-base font-medium text-[#5C5A54]">
              Previous drops. All sold out. None restocked. That's the policy.
            </p>
          </div>
          <Link
            to="/archive"
            data-testid="archive-view-all"
            className="group flex items-center gap-2 border-2 border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-cream"
          >
            FULL ARCHIVE
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* records */}
        <div className="mt-8 border-t-2 border-ink">
          {ARCHIVE_DROPS.map((drop) => (
            <Link
              key={drop.id}
              to="/archive"
              data-testid={`archive-row-${drop.no}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b-2 border-ink py-4 transition-colors duration-200 hover:bg-panel md:grid-cols-[6rem_1fr_8rem_8rem_10rem] md:gap-6 md:px-2"
            >
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-smoke">
                DROP_{drop.no}
              </span>
              <span className="truncate font-heading text-lg font-bold uppercase tracking-tight group-hover:text-signal md:text-2xl">
                {drop.title}
              </span>
              <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.16em] text-smoke md:block">
                {drop.units} UNITS
              </span>
              <span className="hidden text-right font-mono text-[11px] uppercase tracking-[0.16em] text-smoke md:block">
                {drop.closedAt}
              </span>
              <span className="stamp ml-auto border-signal text-xs text-signal md:text-sm">
                SOLD OUT
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
