import { useState } from "react";
import { Dumbbell, Skull, ShoppingBag, Heart, Lock, Building } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";
import LocationCard from "./LocationCard";
import AcademiaModal from "./AcademiaModal";
import CrimesModal from "./CrimesModal";
import CombatModal from "./CombatModal";
import LojaModal from "./LojaModal";
import ImoveisModal from "./ImoveisModal";
import academiaImg from "@/assets/academia.jpg";
import favelaImg from "@/assets/favela.jpg";
import lojaImg from "@/assets/loja.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import prisaoImg from "@/assets/prisao.jpg";

const locations = [
  {
    id: "academia",
    title: "Academia",
    description: "Treine suas habilidades e aumente sua força para dominar as ruas.",
    image: academiaImg,
    icon: Dumbbell,
  },
  {
    id: "favela",
    title: "Favela",
    description: "Cometa crimes, lute e ganhe respeito no submundo.",
    image: favelaImg,
    icon: Skull,
  },
  {
    id: "loja",
    title: "Loja",
    description: "Compre armas, itens e equipamentos para suas missões.",
    image: lojaImg,
    icon: ShoppingBag,
  },
  {
    id: "hospital",
    title: "Hospital",
    description: "Recupere sua energia e cure ferimentos de batalha.",
    image: hospitalImg,
    icon: Heart,
  },
  {
    id: "prisao",
    title: "Prisão",
    description: "Cuidado! Se for pego, vai parar aqui. Tente escapar ou aguarde.",
    image: prisaoImg,
    icon: Lock,
  },
  {
    id: "imoveis",
    title: "Imóveis",
    description: "Compre propriedades e ganhe renda passiva automaticamente.",
    image: prisaoImg,
    icon: Building,
  },
];

const MapSection = () => {
  const [academiaOpen, setAcademiaOpen] = useState(false);
  const [crimesOpen, setCrimesOpen] = useState(false);
  const [combatOpen, setCombatOpen] = useState(false);
  const [lojaOpen, setLojaOpen] = useState(false);
  const [imoveisOpen, setImoveisOpen] = useState(false);
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
  };

  return (
    <section className="pt-32 pb-8 px-4">
      <div className="max-w-lg mx-auto mb-4">
        <h2 className="font-mono-game text-sm font-bold text-muted-foreground uppercase tracking-widest">
          // Mapa da Cidade
        </h2>
      </div>
      <div
        className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scroll-smooth -mx-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex-shrink-0 w-2" />
        {locations.map((loc) => (
          <div key={loc.id} className="snap-center">
            <LocationCard {...loc} onClick={() => handleLocationClick(loc.id)} />
          </div>
        ))}
        <div className="flex-shrink-0 w-2" />
      </div>

      <AcademiaModal open={academiaOpen} onOpenChange={setAcademiaOpen} />
      <CrimesModal open={crimesOpen} onOpenChange={setCrimesOpen} onOpenCombat={() => setCombatOpen(true)} />
      <CombatModal open={combatOpen} onOpenChange={setCombatOpen} />
      <LojaModal open={lojaOpen} onOpenChange={setLojaOpen} />
      <ImoveisModal open={imoveisOpen} onOpenChange={setImoveisOpen} />
    </section>
  );
};

export default MapSection;
