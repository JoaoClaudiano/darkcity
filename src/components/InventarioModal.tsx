import { toast } from "sonner";
import { useGame } from "@/contexts/GameContext";
import { Briefcase, Zap, Brain, Dumbbell, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const iconMap: Record<string, typeof Zap> = {
  energetico: Zap,
  adrenalina: Brain,
  taco: Dumbbell,
  colete: Shield,
};

interface InventarioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InventarioModal = ({ open, onOpenChange }: InventarioModalProps) => {
  const { state, setState, addLog } = useGame();

  const handleUse = (itemId: string) => {
    const item = state.inventory.find((i) => i.id === itemId);
    if (!item || item.type !== "consumable" || item.quantity <= 0) return;

    setState((prev) => {
      let updated = { ...prev };

      if (itemId === "energetico") {
        updated.energia = Math.min(updated.energia + 50, updated.energiaMax);
      } else if (itemId === "adrenalina") {
        updated.nervos = Math.min(updated.nervos + 30, updated.nervosMax);
      }

      updated.inventory = updated.inventory
        .map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0);

      return updated;
    });

    addLog(`Usou ${item.name}.`);
    toast.success(`${item.name} usado!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Mochila
          </DialogTitle>
        </DialogHeader>

        {state.inventory.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Sua mochila está vazia. Visite a Loja!
          </div>
        ) : (
          <div className="space-y-2">
            {state.inventory.map((item) => {
              const Icon = iconMap[item.id] || Briefcase;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-md border border-border bg-secondary/50"
                >
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {item.name}
                      {item.type === "equipment" && (
                        <span className="ml-2 text-xs text-primary font-mono-game">
                          ✓ Equipado
                        </span>
                      )}
                    </div>
                    {item.type === "consumable" && (
                      <div className="text-xs text-muted-foreground">
                        Quantidade: {item.quantity}
                      </div>
                    )}
                  </div>
                  {item.type === "consumable" && (
                    <button
                      onClick={() => handleUse(item.id)}
                      className="text-xs font-mono-game px-3 py-1.5 rounded border border-primary/40 text-primary hover:neon-box hover:border-primary/60 transition-all"
                    >
                      Usar
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InventarioModal;
