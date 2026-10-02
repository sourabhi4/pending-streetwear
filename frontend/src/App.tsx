import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/search/SearchOverlay";
import { CartProvider } from "@/lib/store";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Lookbook from "@/pages/Lookbook";
import ArchivePage from "@/pages/ArchivePage";
import ManifestoPage from "@/pages/ManifestoPage";
import Checkout from "@/pages/Checkout";
import HelpPage from "@/pages/HelpPage";
import NotFound from "@/pages/NotFound";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <div className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/manifesto" element={<ManifestoPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/help/:topic" element={<HelpPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CartDrawer />
      <SearchOverlay />
      <Toaster position="bottom-right" />
    </CartProvider>
  );
}
