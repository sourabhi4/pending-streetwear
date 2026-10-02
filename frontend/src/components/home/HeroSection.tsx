import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

const DIAGNOSTICS = [
  { label: "STATUS", value: "OPERATIONAL", tone: "ok" },
  { label: "ACCOUNTABILITY", value: "NOT FOUND", tone: "bad" },
  { label: "LAST UPDATED", value: "JUST NOW", tone: "ok" },
] as const;

export default function HeroSection() {
  return (
    <section data-testid="hero-section" className="overflow-x-clip border-b-2 border-ink">
      <div className="grid lg:grid-cols-12">
        {/* type side */}
        <div className="relative flex min-h-[78vh] flex-col justify-between px-4 pb-8 pt-10 md:px-8 md:pt-14 lg:col-span-7 lg:min-h-[86vh]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke"
          >
            <span>SYS.BRAND / 001</span>
            <span className="hidden sm:inline">SATIRE-WARE, EST. 2026</span>
            <span className="text-signal">● REC</span>
          </motion.div>

          <div className="py-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-heading text-[clamp(2.75rem,8vw,8.75rem)] font-bold uppercase leading-[0.85] tracking-tighter"
            >
              QUESTION
              <br />
              EVERYTHING<span className="text-signal">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 max-w-md text-lg font-medium leading-relaxed text-[#5C5A54] md:text-xl"
            >
              Streetwear for people who noticed something
              doesn't add up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/shop"
                data-testid="hero-cta-shop"
                className="border-2 border-ink bg-ink px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream transition-all duration-150 hover:bg-acid hover:text-ink hover:shadow-hard active:translate-y-0.5 active:shadow-none"
              >
                SHOP THE DROP
              </Link>
              <a
                href="#system"
                data-testid="hero-cta-system"
                className="group flex items-center gap-2 border-2 border-ink bg-transparent px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-150 hover:bg-ink hover:text-cream active:translate-y-0.5"
              >
                EXPLORE THE SYSTEM
                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* bottom hint */}
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-smoke sm:block">
            ↓ SCROLL FOR EVIDENCE
          </p>
        </div>

        {/* image side */}
        <div className="relative min-h-[52vh] border-t-2 border-ink lg:col-span-5 lg:min-h-0 lg:border-l-2 lg:border-t-0">
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            src="/images/hero-editorial.jpg"
            alt="PENDING lookbook 001 — oversized tees photographed on a Mumbai rooftop"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            <span className="border border-acid bg-black/70 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-acid backdrop-blur-sm">
              DROP 005 // LIVE
            </span>
            <span className="border border-cream/40 bg-black/70 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
              VISUAL ARCHIVE
            </span>
          </div>
        </div>
      </div>

      {/* diagnostics strip */}
      <div className="grid grid-cols-1 border-t-2 border-ink sm:grid-cols-3">
        {DIAGNOSTICS.map((d, i) => (
          <div
            key={d.label}
            className={`flex items-center justify-between gap-3 px-4 py-3 md:px-8 ${
              i > 0 ? "border-t-2 border-ink sm:border-t-0 sm:border-l-2" : ""
            }`}
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke">
              {d.label}:
            </span>
            <span
              className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] ${
                d.tone === "bad" ? "text-signal" : "text-ink"
              }`}
            >
              {d.tone === "ok" && (
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#1B873F]" />
              )}
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
