import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LIVE_DROP_IDS, getProductById } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function LiveDropSection() {
  const drops = LIVE_DROP_IDS.map(getProductById).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <section data-testid="live-drop-section" className="border-b-2 border-ink py-12 md:py-16">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
              SYS.DROP // IN PROGRESS
            </p>
            <h2 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-tighter md:text-6xl">
              LIVE DROP
            </h2>
            <p className="mt-2 text-base font-medium text-[#5C5A54]">
              Relevant now. Gone soon.
            </p>
          </div>
          <Link
            to="/shop"
            data-testid="live-drop-view-all"
            className="group flex items-center gap-2 border-2 border-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-cream"
          >
            VIEW ALL
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* cards — horizontal scroll on mobile, grid on desktop */}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 xl:grid-cols-4">
          {drops.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="w-[70vw] min-w-[70vw] snap-start sm:w-[42vw] sm:min-w-[42vw] md:w-auto md:min-w-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
