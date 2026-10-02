import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/data/products";
import type { CartLine } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addLine: (productId: string, size: string, qty?: number) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  removeLine: (productId: string, size: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "pending.cart.v1";
const WISHLIST_KEY = "pending.wishlist.v1";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full/blocked — cart still works for the session
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => load<CartLine[]>(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => load<string[]>(WISHLIST_KEY, []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => save(CART_KEY, lines), [lines]);
  useEffect(() => save(WISHLIST_KEY, wishlist), [wishlist]);

  const addLine = useCallback((productId: string, size: string, qty = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === productId && l.size === size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { productId, size, qty }];
    });
  }, []);

  const updateQty = useCallback((productId: string, size: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.productId === productId && l.size === size))
        : prev.map((l) =>
            l.productId === productId && l.size === size ? { ...l, qty } : l,
          ),
    );
  }, []);

  const removeLine = useCallback((productId: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.size === size)));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  }, []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      const product = getProductById(line.productId);
      if (!product) continue;
      c += line.qty;
      s += product.price * line.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    addLine,
    updateQty,
    removeLine,
    clearCart,
    wishlist,
    toggleWishlist,
    isWishlisted,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
