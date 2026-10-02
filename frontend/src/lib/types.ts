export type CategorySlug = "scams" | "system" | "india" | "corporate" | "limited-drops";

export interface Category {
  slug: CategorySlug;
  label: string;
  index: string;
  tagline: string;
  description: string;
  /** which brand token drives the category identity */
  accent: "signal" | "acid" | "ink" | "smoke";
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  type: string;
  price: number;
  /** compare-at price, optional */
  mrp?: number;
  color: ProductColor;
  sizes: string[];
  images: string[];
  story: string;
  description: string;
  badge?: string;
  /** units left; 0 = sold out */
  stock: number;
  isLimited?: boolean;
  /** ISO timestamp when the limited drop ends */
  dropEndsAt?: string;
  featured?: boolean;
  isNew?: boolean;
  gsm: number;
  fit: string;
  /** lower = added earlier; drives "newest" sort */
  addedAt: number;
  /** extra search keywords */
  keywords?: string;
}

export interface CartLine {
  productId: string;
  size: string;
  qty: number;
}

export interface ArchiveDrop {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  closedAt: string;
  soldOutIn: string;
  units: number;
  story: string;
  image: string;
  productSlug?: string;
}

export interface LookbookShot {
  src: string;
  title: string;
  meta: string;
}
