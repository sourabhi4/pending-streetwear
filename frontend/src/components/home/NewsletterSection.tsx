import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("INVALID EMAIL", {
        description: "Even the scam emails have a working address.",
      });
      return;
    }
    toast.success("SUBSCRIBED.", {
      description: "The system will notify you before it's gone.",
    });
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      data-testid="newsletter-section"
      className="border-b-2 border-ink py-12 md:py-20"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mx-auto max-w-2xl border-2 border-ink bg-panel p-6 shadow-hard md:p-10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
            SYS.SUBSCRIBE // ZERO SPAM, MOSTLY
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-[0.92] tracking-tighter md:text-5xl">
            GET NOTIFIED
            <br />
            BEFORE IT'S GONE<span className="text-signal">.</span>
          </h2>
          <p className="mt-4 text-base font-medium text-[#5C5A54]">
            New drops. Limited runs. Questionable decisions.
          </p>
          <form
            onSubmit={subscribe}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            data-testid="newsletter-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-testid="newsletter-input"
              aria-label="Email address"
              className="flex-1 border-2 border-ink bg-cream px-4 py-3.5 font-mono text-sm placeholder:text-smoke/60 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              data-testid="newsletter-submit"
              className="group flex items-center justify-center gap-2 border-2 border-ink bg-ink px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream transition-all duration-150 hover:bg-acid hover:text-ink hover:shadow-hard-sm active:translate-y-0.5 active:shadow-none"
            >
              SUBSCRIBE
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">
            BY SUBSCRIBING YOU AGREE TO RECEIVE EXACTLY ONE EMAIL PER DROP. WE
            LOSE TRACK AFTER THAT.
          </p>
        </div>
      </div>
    </section>
  );
}
