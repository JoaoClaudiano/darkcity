import StatsHeader from "@/components/StatsHeader";
import MapSection from "@/components/MapSection";
import PrisaoOverlay from "@/components/PrisaoOverlay";
import BottomNav from "@/components/BottomNav";

const Index = () => (
  <div className="min-h-screen bg-background pb-16">
    <StatsHeader />
    <MapSection />
    <PrisaoOverlay />
    <BottomNav />
  </div>
);

export default Index;
