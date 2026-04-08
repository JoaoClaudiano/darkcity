import React from "react";
import { LucideIcon } from "lucide-react";

interface LocationCardProps {
  title: string;
  description: string;
  image?: string;
  illustration?: React.ComponentType;
  icon: LucideIcon;
  accentColor?: string;
  onClick?: () => void;
}

const LocationCard = ({
  title,
  description,
  image,
  illustration: Illustration,
  icon: Icon,
  accentColor = "#00ff44",
  onClick,
}: LocationCardProps) => (
  <button
    onClick={onClick}
    className="w-full group cursor-pointer focus:outline-none"
    style={{ WebkitTapHighlightColor: "transparent" }}
  >
    <div
      className="relative rounded-xl overflow-hidden bg-card transition-all duration-200 active:scale-95"
      style={{
        border: "2.5px solid #1a1a2e",
        boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
      }}
    >
      {/* Illustration area */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        {Illustration ? (
          <Illustration />
        ) : image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-70"
            loading="lazy"
            width={640}
            height={512}
          />
        ) : null}
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200"
          style={{ background: `radial-gradient(ellipse at center, ${accentColor}22 0%, transparent 70%)` }}
        />
      </div>

      {/* Label bar */}
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{ borderTop: "2px solid #1a1a2e", background: "#0d0d1a" }}
      >
        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />
        <div className="flex-1 min-w-0 text-left">
          <p
            className="font-mono-game text-xs font-bold truncate"
            style={{ color: accentColor, textShadow: `0 0 8px ${accentColor}88` }}
          >
            {title}
          </p>
          <p className="text-muted-foreground text-[10px] leading-tight truncate">{description}</p>
        </div>
      </div>

      {/* Active border flash */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-active:opacity-100 transition-opacity duration-100"
        style={{ border: `2.5px solid ${accentColor}`, boxShadow: `0 0 12px ${accentColor}66` }}
      />
    </div>
  </button>
);

export default LocationCard;
