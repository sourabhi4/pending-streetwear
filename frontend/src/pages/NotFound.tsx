import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      data-testid="not-found-root"
      className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-28 text-center"
    >
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
        ERR 404 // SYS.ROUTE
      </p>
      <h1 className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-tighter md:text-7xl">
        PAGE NOT FOUND
      </h1>
      <p className="max-w-sm font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-smoke">
        LIKE EVERYTHING ELSE IN THE SYSTEM, THIS PAGE EXISTS SOMEWHERE ELSE.
      </p>
      <Link
        to="/"
        data-testid="not-found-home-link"
        className="border-2 border-ink bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-acid hover:text-ink"
      >
        RETURN HOME
      </Link>
    </div>
  );
}
