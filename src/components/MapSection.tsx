import { Dumbbell, Skull, ShoppingBag, Heart, Lock } from "lucide-react";
import LocationCard from "./LocationCard";
import academiaImg from "@/assets/academia.jpg";
import favelaImg from "@/assets/favela.jpg";
import lojaImg from "@/assets/loja.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import prisaoImg from "@/assets/prisao.jpg";

const locations = [
  {
    title: "Academia",
    description: "Treine suas habilidades e aumente sua força para dominar as ruas.",
    image: academiaImg,
    icon: Dumbbell,
  },
  {
    title: "Favela",
    description: "Cometa crimes, roube e ganhe respeito no submundo.",
    image: favelaImg,
    icon: Skull,
  },
  {
    title: "Loja",
    description: "Compre armas, itens e equipamentos para suas missões.",
    image: lojaImg,
    icon: ShoppingBag,
  },
  {
    title: "Hospital",
    description: "Recupere sua energia e cure ferimentos de batalha.",
    image: hospitalImg,
    icon: Heart,
  },
  {
    title: "Prisão",
    description: "Cuidado! Se for pego, vai parar aqui. Tente escapar ou aguarde.",
    image: prisaoImg,
    icon: Lock,
  },
];

const MapSection = () => (
  <section className="pt-28 pb-8 px-4">
    <div className="max-w-lg mx-auto mb-4">
      <h2 className="font-mono-game text-sm font-bold text-muted-foreground uppercase tracking-widest">
        // Mapa da Cidade
      </h2>
    </div>
    <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scroll-smooth -mx-4"
         style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="flex-shrink-0 w-2" />
      {locations.map((loc) => (
        <div key={loc.title} className="snap-center">
          <LocationCard {...loc} />
        </div>
      ))}
      <div className="flex-shrink-0 w-2" />
    </div>
  </section>
);

export default MapSection;
