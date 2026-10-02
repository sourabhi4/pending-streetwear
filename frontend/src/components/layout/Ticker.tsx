import { TICKER_ITEMS } from "@/data/products";

/** Endless scrolling announcement strip. Content is duplicated for a seamless loop. */
export default function Ticker({ dark = false }: { dark?: boolean }) {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {TICKER_ITEMS.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center whitespace-nowrap px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] md:text-xs"
        >
          {item}
          <span className={`ml-8 ${dark ? "text-signal" : "text-signal"}`}>✕</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-testid="announcement-ticker"
      className={`overflow-hidden border-b-2 border-ink ${
        dark ? "bg-ink text-cream" : "bg-acid text-ink"
      }`}
    >
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
