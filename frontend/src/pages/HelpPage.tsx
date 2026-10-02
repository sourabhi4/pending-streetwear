import { Link, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

interface HelpTopic {
  title: string;
  code: string;
  body: string[];
  table?: { head: string[]; rows: string[][] };
}

const TOPICS: Record<string, HelpTopic> = {
  shipping: {
    title: "SHIPPING",
    code: "HELP.01",
    body: [
      "All orders ship within 3–5 business days via speed post & prayers.",
      "Free shipping on orders above ₹1,999. Below that, a flat ₹79 — the system has costs.",
      "Tracking numbers are generated instantly and begin tracking shortly after. 'Shortly' is defined by the system, not by you.",
      "Metros: 2–4 days. Everywhere else: it arrives when it arrives. It always arrives.",
    ],
  },
  returns: {
    title: "RETURNS",
    code: "HELP.02",
    body: [
      "7-day return window. The product must be unworn, unwashed and un-questioned.",
      "Refunds are processed in 5–7 business days. Estimated completion: 2037.",
      "Sale items can be exchanged, not refunded. Like most things in life.",
      "To start a return, email us with your order number and a short essay on what you expected.",
    ],
  },
  "size-guide": {
    title: "SIZE GUIDE",
    code: "HELP.03",
    body: [
      "All measurements in inches, taken flat, rounded with optimism.",
      "Our oversized fit runs big on purpose. Between sizes? Size down — unless you're also between opinions.",
    ],
    table: {
      head: ["SIZE", "CHEST (IN)", "LENGTH (IN)"],
      rows: [
        ["XS", "38–40", "26"],
        ["S", "40–42", "27"],
        ["M", "42–44", "28"],
        ["L", "44–46", "29"],
        ["XL", "46–48", "30"],
        ["XXL", "48–50", "31"],
      ],
    },
  },
  contact: {
    title: "CONTACT",
    code: "HELP.04",
    body: [
      "Email: support@pending-demo.example — we read everything. We reply eventually.",
      "Response time: 3–5 business years.",
      "For order issues, include your order number (PND-XXXXXX). For existential issues, include your Aadhaar. Kidding. Please don't.",
      "Studio: Somewhere in Bengaluru, above a shop that sells only switches.",
    ],
  },
};

export default function HelpPage() {
  const { topic } = useParams<{ topic: string }>();
  const data = topic ? TOPICS[topic] : undefined;

  if (!data) return <Navigate to="/help/shipping" replace />;

  return (
    <div data-testid="help-root" className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
        SYS.HELP // {data.code}
      </p>
      <h1 className="mt-2 font-heading text-4xl font-bold uppercase tracking-tighter md:text-6xl">
        {data.title}
      </h1>

      <div className="mt-8 space-y-4">
        {data.body.map((p) => (
          <p key={p} className="border-l-2 border-ink pl-4 text-base leading-relaxed text-[#3d3b36]">
            {p}
          </p>
        ))}
      </div>

      {data.table && (
        <table
          data-testid="help-size-table"
          className="mt-8 w-full border-2 border-ink text-left font-mono text-xs"
        >
          <thead>
            <tr className="bg-ink text-cream">
              {data.table.head.map((h) => (
                <th key={h} className="px-3 py-2 font-bold uppercase tracking-[0.14em]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.table.rows.map((row) => (
              <tr key={row[0]} className="border-t-2 border-ink">
                {row.map((cell, i) => (
                  <td key={`${cell}-${i}`} className={`px-3 py-2 ${i === 0 ? "font-bold" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-smoke">
        STILL CONFUSED?{" "}
        <Link to="/shop" className="underline underline-offset-4 hover:text-signal">
          BUY SOMETHING
        </Link>{" "}
        — IT WON'T HELP, BUT IT WON'T HURT.
      </p>
    </div>
  );
}
