import StatsHeader from "@/components/StatsHeader";
import MapSection from "@/components/MapSection";
import PrisaoOverlay from "@/components/PrisaoOverlay";

const Index = () => (
  <div className="min-h-screen bg-background">
    <StatsHeader />
    <MapSection />
    <PrisaoOverlay />
  </div>
);

export default Index;
