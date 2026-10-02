import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const LINES = [
  "Question the headline.",
  "Question the receipt.",
  "Question the meeting.",
  "Question the system.",
  "Question the fine print.",
];

export default function ManifestoSection() {
  return (
    <section
      data-testid="manifesto-section"
      className="bg-grain border-b-2 border-ink bg-ink py-14 text-cream md:py-24"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-acid">
            SYS.MANIFESTO // 001
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2.6rem,7.5vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-tighter">
            WE DON'T MAKE
            <br />
            CLOTHES FOR
            <br />
            EVERYONE<span className="text-signal">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-xl font-medium leading-relaxed text-cream/85 md:text-2xl">
            We make them for people who question things.
          </p>

          <div className="mt-10 max-w-xl border-l-2 border-acid pl-5 md:pl-8">
            {LINES.map((line) => (
              <p
                key={line}
                className="py-1 font-mono text-sm uppercase tracking-[0.14em] text-cream/60 md:text-base"
              >
                {line}
              </p>
            ))}
            <p className="pt-3 font-mono text-sm font-bold uppercase tracking-[0.14em] text-acid md:text-base">
              Then wear the answer.
            </p>
          </div>

          <Link
            to="/manifesto"
            data-testid="manifesto-cta"
            className="group mt-10 inline-flex items-center gap-2 border-2 border-acid bg-acid px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all duration-150 hover:shadow-[6px_6px_0_#E52A1B] active:translate-y-0.5 active:shadow-none"
          >
            READ THE MANIFESTO
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
