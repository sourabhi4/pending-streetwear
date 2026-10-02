import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LOOKBOOK_SHOTS } from "@/data/products";
import Ticker from "@/components/layout/Ticker";

export default function Lookbook() {
  return (
    <div data-testid="lookbook-root">
      {/* header */}
      <section className="border-b-2 border-ink px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            VISUAL ARCHIVE
          </p>
          <h1 className="mt-3 font-heading text-[clamp(3rem,9vw,8rem)] font-bold uppercase leading-[0.85] tracking-tighter">
            LOOKBOOK / 001
          </h1>
          <p className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-signal md:text-4xl">
            WEAR THE CHAOS.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-smoke">
            <span>DROP 001</span>
            <span>INDIA / 2026</span>
            <span className="text-[#1B873F]">STATUS: AVAILABLE</span>
            <span>SHOT ON 35MM, OBVIOUSLY</span>
          </div>
        </div>
      </section>

      {/* main visual */}
      <section className="border-b-2 border-ink">
        <div className="relative">
          <img
            src="/images/hero-editorial.jpg"
            alt="PENDING 001 main editorial — oversized tees on a Mumbai rooftop"
            loading="lazy"
            className="max-h-[82vh] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-20 md:px-8">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cream">
              FRAME 000 // THE WHOLE SYSTEM ON ONE ROOF
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-acid">
              MUMBAI / 35MM
            </p>
          </div>
        </div>
      </section>

      <Ticker />

      {/* editorial grid */}
      <section className="px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-12">
          {LOOKBOOK_SHOTS.map((shot, i) => (
            <figure
              key={shot.title}
              className={
                i % 2 === 0
                  ? "md:col-span-7 md:mt-0"
                  : "md:col-span-5 md:mt-16"
              }
              data-testid={`lookbook-shot-${i + 1}`}
            >
              <div className="group overflow-hidden border-2 border-ink">
                <img
                  src={shot.src}
                  alt={shot.title}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
                <span>{shot.title}</span>
                <span className="text-smoke">{shot.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-ink bg-ink px-4 py-14 text-cream md:px-8 md:py-20">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-heading text-3xl font-bold uppercase leading-[0.9] tracking-tighter md:text-5xl">
            THE CLOTHES IN THESE
            <br />
            FRAMES ARE{" "}
            <span className="text-acid">LIMITED.</span>
          </h2>
          <Link
            to="/shop"
            data-testid="lookbook-shop-cta"
            className="group flex items-center gap-2 border-2 border-acid bg-acid px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-shadow hover:shadow-[6px_6px_0_#E52A1B] active:translate-y-0.5 active:shadow-none"
          >
            SHOP THE DROP
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
