import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { toast } from "sonner";
import Ticker from "@/components/layout/Ticker";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "SCAMS", to: "/shop/scams" },
  { label: "SYSTEM", to: "/shop/system" },
  { label: "INDIA", to: "/shop/india" },
  { label: "CORPORATE", to: "/shop/corporate" },
  { label: "LIMITED DROPS", to: "/shop/limited-drops" },
  { label: "LOOKBOOK", to: "/lookbook" },
];

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: "ARCHIVE", to: "/archive" },
  { label: "MANIFESTO", to: "/manifesto" },
];

export default function Header() {
  const { count, setCartOpen, setSearchOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // close the mobile menu on any navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // "/" opens search, unless the user is typing in a field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const navLinkClass = (active: boolean) =>
    cn(
      "relative px-1 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors md:text-xs",
      active ? "text-signal" : "text-ink hover:text-signal",
      "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-signal after:transition-all after:duration-200 hover:after:w-full",
      active && "after:w-full",
    );

  return (
    <header data-testid="header-root" className="sticky top-0 z-50">
      <Ticker />

      <div className="border-b-2 border-ink bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 md:h-16 md:px-8">
          {/* logo */}
          <Link
            to="/"
            data-testid="header-logo"
            className="font-heading text-xl font-bold uppercase tracking-tighter md:text-2xl"
            aria-label="PENDING home"
          >
            PENDING<span className="text-signal">™</span>
          </Link>

          {/* desktop nav */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-testid={`header-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  // /shop/scams should highlight SCAMS but /shop should not highlight anything
                  navLinkClass(isActive)
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              data-testid="header-search-button"
              aria-label="Search the system"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center border-2 border-transparent transition-colors hover:border-ink"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </button>

            <button
              type="button"
              data-testid="header-account-button"
              aria-label="Account"
              onClick={() =>
                toast("ACCOUNT: 404", {
                  description: "Login is under process. Like everything else.",
                })
              }
              className="hidden h-10 w-10 items-center justify-center border-2 border-transparent transition-colors hover:border-ink sm:flex"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </button>

            <button
              type="button"
              data-testid="header-cart-button"
              aria-label={`Bag, ${count} items`}
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 items-center gap-2 border-2 border-transparent px-2 transition-colors hover:border-ink"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2.25} />
              <span
                data-testid="header-cart-count"
                className={cn(
                  "min-w-5 border-2 border-ink bg-acid px-1 text-center font-mono text-[11px] font-bold leading-4",
                  count === 0 && "bg-sand",
                )}
              >
                {count}
              </span>
            </button>

            <button
              type="button"
              data-testid="header-mobile-menu-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center border-2 border-transparent transition-colors hover:border-ink lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={2.25} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-[calc(3.5rem+2.125rem)] z-40 flex flex-col bg-ink text-cream lg:hidden"
            data-testid="mobile-menu"
          >
            <nav
              className="flex flex-1 flex-col overflow-y-auto px-5 py-6"
              aria-label="Mobile"
            >
              {MOBILE_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.25 }}
                >
                  <NavLink
                    to={link.to}
                    data-testid={`mobile-menu-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center justify-between border-b border-cream/15 py-4 font-heading text-3xl font-bold uppercase tracking-tighter",
                        isActive ? "text-acid" : "text-cream",
                      )
                    }
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-cream/40">
                      0{i + 1}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="border-t border-cream/15 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">
              THE SYSTEM IS WORKING. (PROBABLY.)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
