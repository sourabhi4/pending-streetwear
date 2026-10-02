import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks";

type Tone = "check" | "bad" | "mid" | "ok";
interface TermLine {
  text: string;
  tone: Tone;
}

const CHECKS: TermLine[] = [
  { text: "> checking accountability...", tone: "check" },
  { text: "> checking infrastructure...", tone: "check" },
  { text: "> checking common sense...", tone: "check" },
  { text: "> checking corporate meetings...", tone: "check" },
];

const RESULTS: TermLine[] = [
  { text: "ACCOUNTABILITY ........ NOT FOUND", tone: "bad" },
  { text: "COMMON SENSE .......... PARTIAL", tone: "mid" },
  { text: "MEETINGS .............. TOO MANY", tone: "bad" },
  { text: "SCAMS ................. DETECTED", tone: "bad" },
  { text: "JUGAAD ................ OPERATIONAL", tone: "ok" },
  { text: "HOPE .................. STILL RUNNING", tone: "ok" },
];

const TONE_CLASS: Record<Tone, string> = {
  check: "text-cream/70",
  bad: "text-signal",
  mid: "text-cream",
  ok: "text-acid",
};

export default function PendingOSTerminal() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const [lines, setLines] = useState<TermLine[]>([]);
  const [done, setDone] = useState(false);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const run = () => {
    clearTimers();
    setLines([]);
    setDone(false);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLines([...CHECKS, ...RESULTS]);
      setDone(true);
      return;
    }

    let t = 250;
    for (const check of CHECKS) {
      for (let c = 1; c <= check.text.length; c++) {
        const snapshot = check.text.slice(0, c);
        timersRef.current.push(
          window.setTimeout(() => {
            setLines((prev) => [
              ...prev.filter((l) => l.tone !== "check"),
              { text: snapshot, tone: "check" },
            ]);
          }, t),
        );
        t += 16;
      }
      t += 300;
    }
    RESULTS.forEach((r, i) => {
      timersRef.current.push(
        window.setTimeout(() => setLines((prev) => [...prev, r]), t + i * 320),
      );
    });
    timersRef.current.push(
      window.setTimeout(() => setDone(true), t + RESULTS.length * 320 + 250),
    );
  };

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true;
      run();
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section id="system" data-testid="terminal-section" className="border-b-2 border-ink bg-[#0D0D0D] py-12 md:py-20">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-acid">
              SYS.DIAG // INTERACTIVE
            </p>
            <h2 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-tighter text-cream md:text-6xl">
              THE SYSTEM
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-cream/40">
            RUNS AUTOMATICALLY. RESULTS PEER-REVIEWED BY NOBODY.
          </p>
        </div>

        {/* terminal window */}
        <div
          ref={ref}
          className="mx-auto max-w-3xl border-2 border-[#333333] bg-[#0D0D0D] shadow-[10px_10px_0_rgba(217,255,50,0.9)]"
        >
          {/* title bar */}
          <div className="flex items-center justify-between border-b-2 border-[#333333] bg-[#161616] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 bg-signal" />
              <span className="h-3 w-3 bg-[#F2B33D]" />
              <span className="h-3 w-3 bg-acid" />
            </div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cream/60">
              PENDING OS v1.0 — TERMINAL
            </p>
            <button
              type="button"
              data-testid="terminal-rerun"
              onClick={run}
              className="border border-cream/25 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-cream/60 transition-colors hover:border-acid hover:text-acid"
            >
              RE-RUN
            </button>
          </div>

          {/* body */}
          <div className="min-h-[360px] px-5 py-6 font-mono text-[13px] leading-[1.9] md:min-h-[400px] md:px-7 md:text-sm">
            {!inView && !lines.length ? (
              <p className="text-cream/40">{">"} awaiting observer...</p>
            ) : (
              <>
                {lines.map((line, i) => (
                  <p key={`${line.text}-${i}`} className={`whitespace-pre ${TONE_CLASS[line.tone]}`}>
                    {line.text}
                  </p>
                ))}
                <p className="text-acid">
                  <span className="text-cream/60">{"> "} </span>
                  <span className="cursor-blink">▌</span>
                </p>
                {done && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="#newsletter"
                      data-testid="terminal-continue"
                      className="border-2 border-acid bg-acid px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition-shadow hover:shadow-[4px_4px_0_#E52A1B]"
                    >
                      [SYSTEM CONTINUES]
                    </a>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/40">
                      6 ERRORS FOUND. SHIP IT ANYWAY.
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
