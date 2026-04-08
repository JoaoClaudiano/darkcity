import { useState } from "react";
import { Map } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";
import CityMap from "./CityMap";
import AcademiaModal from "./AcademiaModal";
import CrimesModal from "./CrimesModal";
import CombatModal from "./CombatModal";
import LojaModal from "./LojaModal";
import ImoveisModal from "./ImoveisModal";
import CassinoModal from "./CassinoModal";
import OficinaModal from "./OficinaModal";

const MapSection = () => {
  const [academiaOpen, setAcademiaOpen] = useState(false);
  const [crimesOpen, setCrimesOpen] = useState(false);
  const [combatOpen, setCombatOpen] = useState(false);
  const [lojaOpen, setLojaOpen] = useState(false);
  const [imoveisOpen, setImoveisOpen] = useState(false);
  const [cassinoOpen, setCassinoOpen] = useState(false);
  const [oficinaOpen, setOficinaOpen] = useState(false);
  const { isInJail } = useGame();

  const handleLocationClick = (id: string) => {
    if (isInJail) {
      toast.error("Você está preso! Aguarde ou pague a fiança.");
      return;
    }
    if (id === "academia") setAcademiaOpen(true);
    else if (id === "favela") setCrimesOpen(true);
    else if (id === "loja") setLojaOpen(true);
    else if (id === "imoveis") setImoveisOpen(true);
    else if (id === "cassino") setCassinoOpen(true);
    else if (id === "oficina") setOficinaOpen(true);
  };

  return (
    <section className="pt-32 pb-8 px-4">
      {/* Section header */}
      <div className="max-w-lg mx-auto mb-4 flex items-center gap-2">
        <Map className="w-4 h-4 text-primary" />
        <h2 className="font-mono-game text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Mapa da Cidade
        </h2>
      </div>

      {/* City map */}
      <div
        className="max-w-lg mx-auto"
        style={{ borderRadius: "16px", border: "2px solid #12122a" }}
      >
        <CityMap onLocationClick={handleLocationClick} />
      </div>

      <AcademiaModal open={academiaOpen} onOpenChange={setAcademiaOpen} />
      <CrimesModal open={crimesOpen} onOpenChange={setCrimesOpen} onOpenCombat={() => setCombatOpen(true)} />
      <CombatModal open={combatOpen} onOpenChange={setCombatOpen} />
      <LojaModal open={lojaOpen} onOpenChange={setLojaOpen} />
      <ImoveisModal open={imoveisOpen} onOpenChange={setImoveisOpen} />
      <CassinoModal open={cassinoOpen} onOpenChange={setCassinoOpen} />
      <OficinaModal open={oficinaOpen} onOpenChange={setOficinaOpen} />
    </section>
  );
};

export default MapSection;

