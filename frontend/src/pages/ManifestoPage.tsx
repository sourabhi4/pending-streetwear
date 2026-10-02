import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TENETS = [
  { no: "01", line: "QUESTION THE HEADLINE." },
  { no: "02", line: "QUESTION THE RECEIPT." },
  { no: "03", line: "QUESTION THE MEETING." },
  { no: "04", line: "QUESTION THE SYSTEM." },
  { no: "05", line: "QUESTION THE FINE PRINT." },
];

export default function ManifestoPage() {
  return (
    <div data-testid="manifesto-root" className="bg-grain bg-ink text-cream">
      <div className="mx-auto max-w-[1600px] px-4 py-14 md:px-8 md:py-24">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-acid">
          SYS.MANIFESTO // FULL TEXT
        </p>

        <h1 className="mt-6 font-heading text-[clamp(2.8rem,8vw,7.5rem)] font-bold uppercase leading-[0.88] tracking-tighter">
          WE DON'T MAKE
          <br />
          CLOTHES FOR
          <br />
          EVERYONE<span className="text-signal">.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-cream/85 md:text-3xl">
          We make them for people who question things.
        </p>

        <div className="mt-16 md:mt-24">
          {TENETS.map((t) => (
            <div
              key={t.no}
              data-testid={`manifesto-tenet-${t.no}`}
              className="group flex items-baseline gap-6 border-t border-cream/15 py-6 md:gap-12 md:py-10"
            >
              <span className="font-mono text-sm font-bold text-signal md:text-lg">
                {t.no}
              </span>
              <p className="font-heading text-3xl font-bold uppercase leading-none tracking-tighter transition-colors duration-200 group-hover:text-acid md:text-7xl">
                {t.line}
              </p>
            </div>
          ))}
          <div className="border-t border-cream/15 py-8 md:py-12">
            <p className="font-heading text-3xl font-bold uppercase leading-none tracking-tighter text-acid md:text-7xl">
              THEN WEAR THE ANSWER.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-md font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-cream/50">
            <p>
              PENDING™ IS A SATIRE LABEL. EVERY GARMENT IS AN OPINION HELD
              LOOSELY, PRINTED ON 240 GSM COTTON.
            </p>
            <p className="mt-4">
              MANIFESTO v1.0 / LAST AUDITED: NEVER / STATUS: QUESTIONABLE
            </p>
          </div>
          <Link
            to="/shop"
            data-testid="manifesto-shop-cta"
            className="group flex items-center gap-2 border-2 border-acid bg-acid px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-shadow hover:shadow-[6px_6px_0_#E52A1B] active:translate-y-0.5 active:shadow-none"
          >
            SHOP THE DROP
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
