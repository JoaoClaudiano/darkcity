import { useGame } from "@/contexts/GameContext";
import { toast } from "sonner";
import { Home, Building, Castle, Gem } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface PropertyDef {
  id: string;
  name: string;
  price: number;
  income: number;
  icon: typeof Home;
}

export const PROPERTIES: PropertyDef[] = [
  { id: "barraco", name: "Barraco", price: 10_000, income: 100, icon: Home },
  { id: "apartamento", name: "Apartamento", price: 50_000, income: 600, icon: Building },
  { id: "mansao", name: "Mansão", price: 250_000, income: 3_500, icon: Castle },
  { id: "cassino", name: "Cassino", price: 1_000_000, income: 15_000, icon: Gem },
];

const ImoveisModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) => {
  const { state, setState, addLog } = useGame();

  const fmt = (v: number) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  const handleBuy = (prop: PropertyDef) => {
    if (state.dinheiro < prop.price) {
      toast.error("Dinheiro insuficiente!");
      return;
    }
    setState((prev) => ({
      ...prev,
      dinheiro: prev.dinheiro - prop.price,
      properties: { ...prev.properties, [prop.id]: (prev.properties[prop.id] || 0) + 1 },
    }));
    addLog(`🏠 Comprou ${prop.name}!`);
    toast.success(`${prop.name} comprado!`);
  };

  const totalIncome = PROPERTIES.reduce(
    (sum, p) => sum + (state.properties[p.id] || 0) * p.income, 0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <Building className="w-5 h-5" /> Imóveis
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Compre propriedades para renda passiva. Renda atual: {fmt(totalIncome)} / 5min
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {PROPERTIES.map((prop) => {
            const owned = state.properties[prop.id] || 0;
            const Icon = prop.icon;
            return (
              <div
                key={prop.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
              >
                <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono-game text-sm font-bold text-foreground">{prop.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Renda: {fmt(prop.income)} / 5min
                  </p>
                  {owned > 0 && (
                    <p className="text-xs text-primary font-bold">Quantidade: {owned}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => handleBuy(prop)}
                  disabled={state.dinheiro < prop.price}
                  className="font-mono-game text-xs flex-shrink-0"
                >
                  {fmt(prop.price)}
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImoveisModal;
