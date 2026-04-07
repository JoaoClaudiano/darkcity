import { LucideIcon } from "lucide-react";

interface LocationCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const LocationCard = ({ title, description, image, icon: Icon }: LocationCardProps) => (
  <button className="flex-shrink-0 w-64 group cursor-pointer focus:outline-none">
    <div className="relative h-80 rounded-lg overflow-hidden border border-border bg-card transition-all duration-300 group-hover:neon-box group-focus:neon-box group-hover:border-primary/60">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
        loading="lazy"
        width={640}
        height={512}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary neon-text" />
          <h3 className="font-mono-game text-lg font-bold text-primary neon-text">
            {title}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </button>
);

export default LocationCard;
