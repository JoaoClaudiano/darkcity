import { useState } from "react";
import { Dumbbell, Skull, ShoppingBag, Heart, Lock, Building, Dice5, Hammer, Map } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";
import LocationCard from "./LocationCard";
import AcademiaModal from "./AcademiaModal";
import CrimesModal from "./CrimesModal";
import CombatModal from "./CombatModal";
import LojaModal from "./LojaModal";
import ImoveisModal from "./ImoveisModal";
import CassinoModal from "./CassinoModal";
import OficinaModal from "./OficinaModal";
import AcademiaIllustration from "./illustrations/AcademiaIllustration";
import HospitalIllustration from "./illustrations/HospitalIllustration";
import CassinoIllustration from "./illustrations/CassinoIllustration";
import FavelaIllustration from "./illustrations/FavelaIllustration";
import LojaIllustration from "./illustrations/LojaIllustration";
import PrisaoIllustration from "./illustrations/PrisaoIllustration";
import ImoveisIllustration from "./illustrations/ImoveisIllustration";
import OficinaIllustration from "./illustrations/OficinaIllustration";

const locations = [
  {
    id: "academia",
    title: "Academia",
    description: "Treine e aumente sua força.",
    illustration: AcademiaIllustration,
    icon: Dumbbell,
    accentColor: "#ff6800",
  },
  {
    id: "cassino",
    title: "Cassino",
    description: "Aposte alto e arrisque tudo.",
    illustration: CassinoIllustration,
    icon: Dice5,
    accentColor: "#cc00ff",
  },
  {
    id: "hospital",
    title: "Hospital",
    description: "Cure ferimentos de batalha.",
    illustration: HospitalIllustration,
    icon: Heart,
    accentColor: "#00cc66",
  },
  {
    id: "favela",
    title: "Favela",
    description: "Cometa crimes no submundo.",
    illustration: FavelaIllustration,
    icon: Skull,
    accentColor: "#cc2200",
  },
  {
    id: "imoveis",
    title: "Imóveis",
    description: "Compre e ganhe renda passiva.",
    illustration: ImoveisIllustration,
    icon: Building,
    accentColor: "#d4a800",
  },
  {
    id: "loja",
    title: "Loja",
    description: "Compre armas e equipamentos.",
    illustration: LojaIllustration,
    icon: ShoppingBag,
    accentColor: "#00aaff",
  },
  {
    id: "prisao",
    title: "Prisão",
    description: "Cuidado! Tente escapar.",
    illustration: PrisaoIllustration,
    icon: Lock,
    accentColor: "#888888",
  },
  {
    id: "oficina",
    title: "Oficina",
    description: "Melhore seus equipamentos.",
    illustration: OficinaIllustration,
    icon: Hammer,
    accentColor: "#0088cc",
  },
];

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

      {/* City map grid */}
      <div
        className="max-w-lg mx-auto"
        style={{
          background: "repeating-linear-gradient(0deg,#0d0d1a 0px,#0d0d1a 59px,#12122a 59px,#12122a 61px),repeating-linear-gradient(90deg,#0d0d1a 0px,#0d0d1a 59px,#12122a 59px,#12122a 61px)",
          borderRadius: "16px",
          padding: "10px",
          border: "2px solid #12122a",
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          {locations.map((loc) => (
            <LocationCard
              key={loc.id}
              title={loc.title}
              description={loc.description}
              illustration={loc.illustration}
              icon={loc.icon}
              accentColor={loc.accentColor}
              onClick={() => handleLocationClick(loc.id)}
            />
          ))}
        </div>
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

