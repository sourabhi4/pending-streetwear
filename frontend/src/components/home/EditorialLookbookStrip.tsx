import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LOOKBOOK_SHOTS } from "@/data/products";

export default function EditorialLookbookStrip() {
  return (
    <section data-testid="lookbook-strip" className="border-b-2 border-ink py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              VISUAL ARCHIVE
            </p>
            <h2 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-tighter md:text-6xl">
              LOOKBOOK / 001
            </h2>
            <p className="mt-2 font-heading text-xl font-bold uppercase tracking-tight text-signal md:text-2xl">
              WEAR THE CHAOS.
            </p>
          </div>
          <Link
            to="/lookbook"
            data-testid="lookbook-strip-view-all"
            className="group flex items-center gap-2 border-2 border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-cream"
          >
            FULL LOOKBOOK
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* editorial grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-12">
          <Link
            to="/lookbook"
            className="group relative block overflow-hidden border-2 border-ink md:col-span-7"
            data-testid="lookbook-strip-image-1"
          >
            <img
              src={LOOKBOOK_SHOTS[0].src}
              alt={LOOKBOOK_SHOTS[0].title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:aspect-[16/13]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cream">
              <span>{LOOKBOOK_SHOTS[0].title}</span>
              <span className="hidden text-cream/60 sm:inline">{LOOKBOOK_SHOTS[0].meta}</span>
            </div>
          </Link>

          <div className="grid gap-4 md:col-span-5">
            <Link
              to="/lookbook"
              className="group relative block overflow-hidden border-2 border-ink"
              data-testid="lookbook-strip-image-2"
            >
              <img
                src={LOOKBOOK_SHOTS[2].src}
                alt={LOOKBOOK_SHOTS[2].title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:aspect-auto md:h-full md:max-h-72"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cream">
                {LOOKBOOK_SHOTS[2].title}
              </div>
            </Link>

            <div className="flex flex-col justify-between gap-4 border-2 border-ink bg-ink p-5 text-cream">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
                <span className="text-cream/50">DROP 001</span>
                <span className="text-right text-acid">INDIA / 2026</span>
                <span className="text-cream/50">STATUS</span>
                <span className="text-right text-acid">AVAILABLE</span>
              </div>
              <p className="font-heading text-2xl font-bold uppercase leading-[0.95] tracking-tighter">
                FIVE FOLDERS.
                <br />
                <span className="text-acid">ONE WARDROBE.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
