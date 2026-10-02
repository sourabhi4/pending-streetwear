import HeroSection from "@/components/home/HeroSection";
import LiveDropSection from "@/components/home/LiveDropSection";
import CategorySystemNav from "@/components/home/CategorySystemNav";
import EditorialLookbookStrip from "@/components/home/EditorialLookbookStrip";
import PendingOSTerminal from "@/components/home/PendingOSTerminal";
import ManifestoSection from "@/components/home/ManifestoSection";
import ArchiveSection from "@/components/home/ArchiveSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveDropSection />
      <CategorySystemNav />
      <EditorialLookbookStrip />
      <PendingOSTerminal />
      <ManifestoSection />
      <ArchiveSection />
      <NewsletterSection />
    </>
  );
}
