import React, { useState } from "react";
import {
  Dumbbell,
  Skull,
  ShoppingBag,
  Building,
  Dice5,
  Wrench,
  Heart,
  PlaneTakeoff,
  Lock,
  ChevronRight,
} from "lucide-react";

// ─── location definitions ──────────────────────────────────────────────────────

interface Location {
  id: string;
  label: string;
  description: string;
  color: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  locked: boolean;
  lockedLabel?: string;
}

const LOCATIONS: Location[] = [
  {
    id: "academia",
    label: "Academia",
    description: "Treine e evolua seus atributos",
    color: "#ff6800",
    Icon: Dumbbell,
    locked: false,
  },
  {
    id: "favela",
    label: "Favela",
    description: "Cometa crimes e ganhe respeito",
    color: "#cc2200",
    Icon: Skull,
    locked: false,
  },
  {
    id: "loja",
    label: "Loja",
    description: "Compre itens e equipamentos",
    color: "#00aaff",
    Icon: ShoppingBag,
    locked: false,
  },
  {
    id: "imoveis",
    label: "Imóveis",
    description: "Invista em propriedades",
    color: "#d4a800",
    Icon: Building,
    locked: false,
  },
  {
    id: "cassino",
    label: "Cassino",
    description: "Aposte e tente a sorte",
    color: "#cc00ff",
    Icon: Dice5,
    locked: false,
  },
  {
    id: "oficina",
    label: "Oficina",
    description: "Construa e melhore seus itens",
    color: "#0088cc",
    Icon: Wrench,
    locked: false,
  },
  {
    id: "hospital",
    label: "Hospital",
    description: "Recupere sua saúde",
    color: "#00cc66",
    Icon: Heart,
    locked: true,
    lockedLabel: "Em breve",
  },
  {
    id: "aeroporto",
    label: "Aeroporto",
    description: "Viaje para outras cidades",
    color: "#00ccff",
    Icon: PlaneTakeoff,
    locked: true,
    lockedLabel: "Em breve",
  },
];

// ─── single location row ───────────────────────────────────────────────────────

interface LocationRowProps {
  location: Location;
  onClick?: () => void;
}

const LocationRow = ({ location, onClick }: LocationRowProps) => {
  const [pressed, setPressed] = useState(false);
  const { label, description, color, Icon, locked, lockedLabel } = location;

  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      onPointerDown={() => !locked && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-100 focus:outline-none disabled:cursor-default"
      style={{
        background: pressed ? `${color}12` : "transparent",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* icon badge */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
        style={{
          background: locked ? "#1a1a2e" : `${color}1a`,
          border: `1.5px solid ${locked ? "#2a2a44" : `${color}55`}`,
        }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: locked ? "#3a3a5a" : color }}
        />
      </div>

      {/* text */}
      <div className="flex-1 text-left min-w-0">
        <p
          className="font-mono-game text-sm font-bold truncate"
          style={{
            color: locked ? "#3a3a5a" : color,
            textShadow: locked ? "none" : `0 0 10px ${color}66`,
          }}
        >
          {label.toUpperCase()}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">{description}</p>
      </div>

      {/* right indicator */}
      {locked ? (
        <div className="flex-shrink-0 flex items-center gap-1.5">
          <span className="font-mono-game text-[10px] text-muted-foreground/50 uppercase tracking-wider">
            {lockedLabel}
          </span>
          <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
        </div>
      ) : (
        <ChevronRight
          className="flex-shrink-0 w-4 h-4 transition-transform duration-100"
          style={{ color: `${color}88`, transform: pressed ? "translateX(2px)" : "none" }}
        />
      )}
    </button>
  );
};

// ─── main component ────────────────────────────────────────────────────────────

interface CityMapProps {
  onLocationClick: (id: string) => void;
}

const CityMap: React.FC<CityMapProps> = ({ onLocationClick }) => (
  <div
    className="overflow-hidden"
    style={{ borderRadius: "12px", border: "1.5px solid #1a1a2e", background: "#08080f" }}
  >
    {LOCATIONS.map((loc, idx) => (
      <div key={loc.id}>
        <LocationRow
          location={loc}
          onClick={() => onLocationClick(loc.id)}
        />
        {idx < LOCATIONS.length - 1 && (
          <div style={{ height: "1px", background: "#12122a", margin: "0 16px" }} />
        )}
      </div>
    ))}
  </div>
);

export default CityMap;
