import { Link } from "react-router-dom";
import { SiInstagram, SiX, SiYoutube } from "@icons-pack/react-simple-icons";
import { CATEGORIES } from "@/data/products";

const HELP_LINKS = [
  { label: "SHIPPING", to: "/help/shipping" },
  { label: "RETURNS", to: "/help/returns" },
  { label: "SIZE GUIDE", to: "/help/size-guide" },
  { label: "CONTACT", to: "/help/contact" },
];

const ABOUT_LINKS = [
  { label: "MANIFESTO", to: "/manifesto" },
  { label: "LOOKBOOK", to: "/lookbook" },
  { label: "ARCHIVE", to: "/archive" },
];

export default function Footer() {
  return (
    <footer
      data-testid="footer-root"
      className="border-t-2 border-ink bg-ink text-cream"
    >
      {/* giant watermark */}
      <div
        aria-hidden
        className="overflow-hidden border-b border-cream/10 px-4 pt-8 md:px-8"
      >
        <p className="text-outline-cream select-none text-center font-heading text-[18vw] font-bold uppercase leading-[0.8] tracking-tighter md:text-[11rem]">
          PENDING™
        </p>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 md:grid-cols-12 md:px-8 md:py-16">
        {/* brand */}
        <div className="md:col-span-5">
          <p className="font-heading text-2xl font-bold uppercase tracking-tighter">
            PENDING<span className="text-signal">™</span>
          </p>
          <p className="mt-3 max-w-xs font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-cream/60">
            THE SYSTEM IS WORKING. (PROBABLY.)
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
            Wearable satire about scams, broken systems, corporate life and
            everyday Indian chaos. We don't sell political merchandise — we
            sell the question mark.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: SiInstagram, label: "Instagram", testid: "footer-social-instagram" },
              { icon: SiX, label: "X", testid: "footer-social-x" },
              { icon: SiYoutube, label: "YouTube", testid: "footer-social-youtube" },
            ].map(({ icon: Icon, label, testid }) => (
              <a
                key={label}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                data-testid={testid}
                className="flex h-10 w-10 items-center justify-center border border-cream/25 text-cream transition-colors hover:border-acid hover:bg-acid hover:text-ink"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* shop */}
        <nav className="md:col-span-2" aria-label="Shop">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            SHOP
          </p>
          <ul className="mt-4 space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/shop/${c.slug}`}
                  data-testid={`footer-shop-${c.slug}`}
                  className="text-sm uppercase tracking-wide text-cream/80 transition-colors hover:text-acid"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* about */}
        <nav className="md:col-span-2" aria-label="About">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            ABOUT
          </p>
          <ul className="mt-4 space-y-2.5">
            {ABOUT_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-about-${l.to.replace("/", "")}`}
                  className="text-sm uppercase tracking-wide text-cream/80 transition-colors hover:text-acid"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* help */}
        <nav className="md:col-span-3" aria-label="Help">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            HELP
          </p>
          <ul className="mt-4 space-y-2.5">
            {HELP_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-help-${l.to.replace("/help/", "")}`}
                  className="text-sm uppercase tracking-wide text-cream/80 transition-colors hover:text-acid"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-2 px-4 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50 sm:flex-row sm:items-center md:px-8">
          <span data-testid="footer-copyright">© 2026 PENDING™</span>
          <span>MADE IN INDIA.</span>
          <span>NO RIGHTS RESERVED. EVERYTHING QUESTIONED.</span>
        </div>
      </div>
    </footer>
  );
}
