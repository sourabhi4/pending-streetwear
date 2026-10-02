import type { ArchiveDrop, Category, LookbookShot, Product } from "@/lib/types";

export const FREE_SHIPPING_THRESHOLD = 1999;

export const CATEGORIES: Category[] = [
  {
    slug: "scams",
    label: "SCAMS",
    index: "01",
    tagline: "Fraud, fake promises & shady deals.",
    description:
      "Nigerian princes, lottery wins, OTPs nobody asked for. Dress for the con you didn't fall for.",
    accent: "signal",
  },
  {
    slug: "system",
    label: "SYSTEM",
    index: "02",
    tagline: "Bureaucracy, forms, errors & delays.",
    description:
      "Status: pending since 2009. Wear the queue so you don't have to stand in it.",
    accent: "acid",
  },
  {
    slug: "india",
    label: "INDIA",
    index: "03",
    tagline: "Everyday chaos & cultural observations.",
    description:
      "Jugaad, UPI and beautiful chaos. A love letter written entirely in fine print.",
    accent: "ink",
  },
  {
    slug: "corporate",
    label: "CORPORATE",
    index: "04",
    tagline: "Meetings, PPTs & office survival.",
    description:
      "Per my last email. Circling back. Taking this offline. Wearing it, smugly, on Friday.",
    accent: "smoke",
  },
  {
    slug: "limited-drops",
    label: "LIMITED DROPS",
    index: "05",
    tagline: "Relevant now. Gone soon.",
    description:
      "Time-sensitive runs built on current cultural moments. When it's gone, it's archive.",
    accent: "signal",
  },
];

export const PRODUCT_TYPES = [
  "Oversized T-shirts",
  "Regular T-shirts",
  "Hoodies",
  "Caps",
  "Tote bags",
  "Sticker packs",
  "Posters",
] as const;

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const APPAREL: string[] = [...SIZES];

const LIMIT_DROP_END = "2026-12-31T18:30:00.000Z";

const img = (slug: string) => `/images/products/${slug}.jpg`;
const alt = (slug: string) => `/images/products/${slug}-alt.jpg`;

export const PRODUCTS: Product[] = [
  // ---------------- SCAMS ----------------
  {
    id: "p01",
    slug: "scam-detected",
    name: "SCAM DETECTED™",
    category: "scams",
    type: "Oversized T-shirts",
    price: 1799,
    mrp: 2499,
    color: { name: "Washed Black", hex: "#1A1A1A" },
    sizes: APPAREL,
    images: [img("scam-detected"), alt("scam-detected")],
    story:
      "Because somehow the warning signs are always visible after the transaction.",
    description:
      "A 240 GSM heavyweight oversized tee with a screen-printed alert stamp on the back. For people who read the terms, then got scammed anyway.",
    badge: "DROP 001 // BESTSELLER",
    stock: 8,
    featured: true,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 1,
    keywords: "scam fraud phishing lottery fake prince otp warning",
  },
  {
    id: "p02",
    slug: "100-percent-genuine",
    name: "100% GENUINE*",
    category: "scams",
    type: "Regular T-shirts",
    price: 1699,
    mrp: 2199,
    color: { name: "Raw Ecru", hex: "#EFE9D8" },
    sizes: APPAREL,
    images: [img("100-genuine")],
    story:
      "Genuine like everything else on a shopping street at 4 AM. The asterisk knows exactly what it did.",
    description:
      "Regular-fit tee in raw ecru with an oversized red asterisk print. The asterisk is the entire disclaimer.",
    stock: 24,
    isNew: true,
    gsm: 220,
    fit: "Regular street cut",
    addedAt: 2,
    keywords: "scam fake genuine asterisk disclaimer replica first copy",
  },
  {
    id: "p03",
    slug: "trust-me-bro",
    name: "TRUST ME BRO",
    category: "scams",
    type: "Oversized T-shirts",
    price: 1599,
    color: { name: "Washed Charcoal", hex: "#3A3A38" },
    sizes: APPAREL,
    images: [img("trust-me-bro")],
    story:
      "India's most trusted source of information. Verified by absolutely nobody, since forever.",
    description:
      "Washed charcoal oversized tee. No graphic on the front. You just have to trust us on the back print.",
    stock: 33,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 3,
    keywords: "trust bro source verified rumour whatsapp university",
  },
  {
    id: "p04",
    slug: "congratulations-selected",
    name: "CONGRATULATIONS! YOU HAVE BEEN SELECTED",
    category: "scams",
    type: "Posters",
    price: 699,
    mrp: 999,
    color: { name: "Ink on Cream", hex: "#111111" },
    sizes: ["A2"],
    images: [img("congratulations-selected")],
    story:
      "You have been selected. For what? Pay the processing fee to find out. (Don't. It's a poster.)",
    description:
      "A2 archival matte poster. Kluwers-Kluwers red stamp typography on cream stock. Frame not included. Winner status included.",
    stock: 50,
    gsm: 300,
    fit: "A2 archival matte print",
    addedAt: 4,
    keywords: "poster lottery congratulations selected prize processing fee kbc",
  },
  {
    id: "p05",
    slug: "otp-123456",
    name: "YOUR OTP IS 123456",
    category: "scams",
    type: "Sticker packs",
    price: 299,
    color: { name: "Signal Red / Ink", hex: "#E52A1B" },
    sizes: ["PACK OF 12"],
    images: [img("otp-123456")],
    story:
      "Never share your OTP. Except this one. This one you can stick on your laptop.",
    description:
      "Die-cut vinyl sticker pack. Waterproof, UV-proof, and 100% resistant to logical arguments.",
    stock: 40,
    gsm: 0,
    fit: "Die-cut vinyl, pack of 12",
    addedAt: 5,
    keywords: "otp sticker bank kyc verify pin security",
  },

  // ---------------- SYSTEM ----------------
  {
    id: "p06",
    slug: "system-error-404",
    name: "SYSTEM ERROR 404",
    category: "system",
    type: "Oversized T-shirts",
    price: 1799,
    mrp: 2299,
    color: { name: "Pitch Black", hex: "#161616" },
    sizes: APPAREL,
    images: [img("system-error-404"), alt("system-error-404")],
    story: "Accountability couldn't be found. We tried restarting.",
    description:
      "Heavyweight oversized tee with a glitched 404 print. Works even when the portal doesn't.",
    badge: "CORE SYSTEM",
    stock: 5,
    featured: true,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 6,
    keywords: "error 404 system crash server not found accountability",
  },
  {
    id: "p07",
    slug: "under-process",
    name: "UNDER PROCESS",
    category: "system",
    type: "Regular T-shirts",
    price: 1699,
    color: { name: "Raw Ecru", hex: "#EFE9D8" },
    sizes: APPAREL,
    images: [img("under-process"), alt("under-process")],
    story:
      "Application submitted. Documents uploaded. Hope submitted. Estimated completion: 2037.",
    description:
      "Regular-fit ecru tee with a rubber-stamp red print. Currently pending three levels of internal approval.",
    badge: "STAFF PICK",
    stock: 18,
    featured: true,
    gsm: 220,
    fit: "Regular street cut",
    addedAt: 7,
    keywords: "under process pending approval files babu office application",
  },
  {
    id: "p08",
    slug: "file-not-found",
    name: "FILE NOT FOUND",
    category: "system",
    type: "Oversized T-shirts",
    price: 1799,
    color: { name: "Concrete Grey", hex: "#8A8A86" },
    sizes: APPAREL,
    images: [img("file-not-found")],
    story:
      "The file exists. It simply does not wish to be found before lunch. Please try again after 3:30.",
    description:
      "Concrete-grey oversized tee. Manila-folder graphic, barcoded spine, deeply untraceable.",
    stock: 0,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 8,
    keywords: "file not found lost documents missing records archive",
  },
  {
    id: "p09",
    slug: "estimated-2037",
    name: "ESTIMATED COMPLETION: 2037",
    category: "system",
    type: "Caps",
    price: 1299,
    color: { name: "Midnight / Acid Thread", hex: "#111111" },
    sizes: ["ONE SIZE"],
    images: [img("estimated-2037")],
    story:
      "Your call is important to us. Estimated wait time: one full election cycle.",
    description:
      "Structured six-panel cap with acid-green chain-stitch embroidery. Adjustable. Unlike the timeline.",
    stock: 15,
    isNew: true,
    gsm: 0,
    fit: "Structured 6-panel strapback",
    addedAt: 9,
    keywords: "cap deadline timeline delay completion 2037 waiting",
  },

  // ---------------- INDIA ----------------
  {
    id: "p10",
    slug: "india-exe",
    name: "INDIA.EXE",
    category: "india",
    type: "Oversized T-shirts",
    price: 1899,
    color: { name: "Pitch Black / Acid", hex: "#161616" },
    sizes: APPAREL,
    images: [img("india-exe")],
    story:
      "Running continuously since 1947. Several processes crashed. Still the most stable unstable system in the market.",
    description:
      "Black oversized tee with a terminal-green command-line print. Boots instantly, crashes beautifully.",
    badge: "CULT ICON",
    stock: 30,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 10,
    keywords: "india exe terminal code chaos boot crash",
  },
  {
    id: "p11",
    slug: "jugaad",
    name: "JUGAAD",
    category: "india",
    type: "Oversized T-shirts",
    price: 1699,
    color: { name: "Raw Ecru", hex: "#EFE9D8" },
    sizes: APPAREL,
    images: [img("jugaad")],
    story:
      "Engineering degree optional. Tape mandatory. The fix will hold. Probably. Long enough.",
    description:
      "Ecru oversized tee with wire-and-tape schematic print. Certified by ceiling fans held up with wire since 1984.",
    stock: 27,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 11,
    keywords: "jugaad hack fix tape innovation repair",
  },
  {
    id: "p12",
    slug: "beautiful-chaos",
    name: "BEAUTIFUL CHAOS",
    category: "india",
    type: "Oversized T-shirts",
    price: 1799,
    color: { name: "Washed Charcoal", hex: "#3A3A38" },
    sizes: APPAREL,
    images: [img("beautiful-chaos")],
    story:
      "Five people. One scooter. Zero rules. It should not work. It always works.",
    description:
      "Charcoal oversized tee with a halftone crowd print. Every bead is a different story.",
    stock: 21,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 12,
    keywords: "chaos crowd street scooter traffic beautiful",
  },
  {
    id: "p13",
    slug: "upi-unified-problems",
    name: "UPI: UNIFIED PROBLEMS OF INDIA",
    category: "india",
    type: "Regular T-shirts",
    price: 1899,
    color: { name: "Off-White", hex: "#F0EBDD" },
    sizes: APPAREL,
    images: [img("upi-unified-problems")],
    story:
      "Unified Payments Interface. Unified Problems of India. The money left. The recipient is still 'Vishal K.'",
    description:
      "Regular-fit tee with a glitched payment-splash print. Sent with love, delivered to the wrong Vishal.",
    stock: 22,
    isNew: true,
    gsm: 220,
    fit: "Regular street cut",
    addedAt: 13,
    keywords: "upi payment bank transfer vishal scan pay fail",
  },
  {
    id: "p14",
    slug: "made-in-india-tote",
    name: "MADE IN INDIA — HEAVY CANVAS TOTE",
    category: "india",
    type: "Tote bags",
    price: 899,
    mrp: 1199,
    color: { name: "Natural Raw Canvas", hex: "#E5DDC8" },
    sizes: ["ONE SIZE"],
    images: [img("made-in-india-tote")],
    story:
      "Carries groceries, laptops, and the weight of expectations since 1947.",
    description:
      "380 GSM raw canvas tote with reinforced gusset and a red utility stamp. Carries more than it should, like everything here.",
    stock: 35,
    gsm: 380,
    fit: "Reinforced gusset tote",
    addedAt: 14,
    keywords: "tote bag made in india canvas groceries carry",
  },

  // ---------------- CORPORATE ----------------
  {
    id: "p15",
    slug: "corporate-slave",
    name: "CORPORATE SLAVE",
    category: "corporate",
    type: "Oversized T-shirts",
    price: 1799,
    color: { name: "Obsidian Black", hex: "#161616" },
    sizes: APPAREL,
    images: [img("corporate-slave")],
    story:
      "Owns nothing. Attends everything. The lanyard is the new chain — wear it proudly.",
    description:
      "Black oversized tee with an employee-ID chest print. Name field left intentionally blank.",
    badge: "HR APPROVED*",
    stock: 26,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 15,
    keywords: "corporate slave office job lanyard employee id work",
  },
  {
    id: "p16",
    slug: "same-ppt-different-day",
    name: "SAME PPT. DIFFERENT DAY.",
    category: "corporate",
    type: "Regular T-shirts",
    price: 1699,
    color: { name: "Off-White", hex: "#F0EBDD" },
    sizes: APPAREL,
    images: [img("same-ppt-different-day")],
    story:
      "Slide 14 has been final_v2_FINAL(3).pptx. Nobody has opened it since Tuesday.",
    description:
      "Regular-fit tee with a dead slide-deck print. Disclaimer: deck will still not be opened.",
    stock: 20,
    gsm: 220,
    fit: "Regular street cut",
    addedAt: 16,
    keywords: "ppt powerpoint presentation deck slide office meeting",
  },
  {
    id: "p17",
    slug: "another-meeting-email",
    name: "ANOTHER MEETING THAT COULD'VE BEEN AN EMAIL",
    category: "corporate",
    type: "Oversized T-shirts",
    price: 1799,
    color: { name: "Washed Black", hex: "#1A1A1A" },
    sizes: APPAREL,
    images: [img("another-meeting-email")],
    story:
      "This meeting could have been an email. That email could have been ignored.",
    description:
      "Black oversized tee with a calendar-invite grid print. RSVP: maybe. Attendance: physical only.",
    stock: 28,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 17,
    keywords: "meeting email calendar invite office rsvp standup",
  },
  {
    id: "p18",
    slug: "take-this-offline",
    name: "LET'S TAKE THIS OFFLINE — HOODIE",
    category: "corporate",
    type: "Hoodies",
    price: 2999,
    mrp: 3699,
    color: { name: "Charcoal Smog", hex: "#33322F" },
    sizes: ["S", "M", "L", "XL"],
    images: [img("take-this-offline")],
    story:
      "Said in every meeting. Meant in none. The hoodie for taking things offline. Forever.",
    description:
      "400 GSM French terry hoodie with an offline-toggle chest print. No online status. No last seen.",
    stock: 14,
    gsm: 400,
    fit: "Heavyweight drop-shoulder",
    addedAt: 18,
    keywords: "offline hoodie meeting corporate hood sweatshirt",
  },

  // ---------------- LIMITED DROPS ----------------
  {
    id: "p19",
    slug: "trust-the-process",
    name: "TRUST THE PROCESS™",
    category: "limited-drops",
    type: "Hoodies",
    price: 1999,
    mrp: 2599,
    color: { name: "Ecru / Acid Loop", hex: "#EFE9D8" },
    sizes: APPAREL,
    images: [img("trust-the-process"), alt("trust-the-process")],
    story:
      "The process doesn't know you exist. Trust it anyway. Limited run of 100 pieces.",
    description:
      "400 GSM ecru hoodie with an acid-green loop-arrow back print. Limited to 100 numbered pieces. When it's gone, it's archive.",
    badge: "LIMITED // 100 PIECES",
    stock: 12,
    isLimited: true,
    dropEndsAt: LIMIT_DROP_END,
    featured: true,
    gsm: 400,
    fit: "Ultra-heavyweight oversized",
    addedAt: 19,
    keywords: "trust process limited hoodie drop rare",
  },
  {
    id: "p20",
    slug: "terms-and-conditions-apply",
    name: "TERMS & CONDITIONS APPLY*",
    category: "limited-drops",
    type: "Oversized T-shirts",
    price: 1999,
    color: { name: "Pitch Black", hex: "#161616" },
    sizes: APPAREL,
    images: [img("terms-and-conditions-apply")],
    story:
      "You didn't read them. We didn't write them. Nobody has ever read them. That's the point.",
    description:
      "Black oversized tee covered edge-to-edge in unreadable fine print. Legible at 400% zoom only.",
    badge: "LIMITED // 150 PIECES",
    stock: 7,
    isLimited: true,
    dropEndsAt: LIMIT_DROP_END,
    isNew: true,
    gsm: 240,
    fit: "Boxy oversized",
    addedAt: 20,
    keywords: "terms conditions fine print legal disclaimer limited",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export const LIVE_DROP_IDS = ["p01", "p06", "p07", "p19"];

export const ARCHIVE_DROPS: ArchiveDrop[] = [
  {
    id: "drop-001",
    no: "001",
    title: "SCAM DETECTED",
    subtitle: "The one that started the record label of warnings.",
    closedAt: "FEB 2026",
    soldOutIn: "14 MIN",
    units: 100,
    story:
      "One hundred pieces. Fourteen minutes. Three hundred people emailing us asking for a 'restock, bro, please'. The restock is not coming. That's the whole point of archive.",
    image: img("scam-detected"),
    productSlug: "scam-detected",
  },
  {
    id: "drop-002",
    no: "002",
    title: "SYSTEM ERROR",
    subtitle: "Server meltdown, but make it fashion.",
    closedAt: "MAR 2026",
    soldOutIn: "9 MIN",
    units: 150,
    story:
      "Our payment gateway crashed during checkout. Ironically on-brand. Everyone who stayed in the queue got a piece. Everyone else got an apology and this archive entry.",
    image: img("system-error-404"),
    productSlug: "system-error-404",
  },
  {
    id: "drop-003",
    no: "003",
    title: "TRUST THE PROCESS",
    subtitle: "Four minutes. One hundred pieces. Zero trust issues resolved.",
    closedAt: "APR 2026",
    soldOutIn: "4 MIN",
    units: 100,
    story:
      "The fastest sellout in PENDING™ history. We trusted the process. The process gave us a sellout and a backlog of complaints. Fair.",
    image: img("trust-the-process"),
    productSlug: "trust-the-process",
  },
  {
    id: "drop-004",
    no: "004",
    title: "UNDER PROCESS",
    subtitle: "Still technically not dispatched. Archival, though.",
    closedAt: "MAY 2026",
    soldOutIn: "22 MIN",
    units: 150,
    story:
      "Sold out in twenty-two minutes. The last four orders were, fittingly, stuck in 'processing' for eleven days. They arrived. We think. Nobody has confirmed.",
    image: img("under-process"),
    productSlug: "under-process",
  },
];

export const LOOKBOOK_SHOTS: LookbookShot[] = [
  {
    src: "/images/lookbook-1.jpg",
    title: "SHOT 001 // ROOFTOP PROTOCOL",
    meta: "MUMBAI / 35MM / EXP 01",
  },
  {
    src: "/images/lookbook-2.jpg",
    title: "SHOT 002 // SUBWAY ELEVATION",
    meta: "DELHI / 50MM / EXP 02",
  },
  {
    src: "/images/lookbook-3.jpg",
    title: "SHOT 003 // NEON BUREAUCRACY",
    meta: "BENGALURU / 28MM / EXP 03",
  },
  {
    src: "/images/lookbook-4.jpg",
    title: "SHOT 004 // MIDNIGHT JUGAAD",
    meta: "JAIPUR / 35MM / EXP 04",
  },
];

export const TICKER_ITEMS = [
  "THE SYSTEM IS WORKING. (PROBABLY.)",
  "240 GSM HEAVYWEIGHT COTTON",
  "NO REFUNDS ON BROKEN PROMISES",
  "WEAR THE CHAOS",
  "DISPATCHED VIA SPEED POST & PRAYERS",
  "LIMITED RUNS. ZERO RESTOCKS.",
];
