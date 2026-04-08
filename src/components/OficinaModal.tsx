import { toast } from "sonner";
import { useGame, InventoryItem } from "@/contexts/GameContext";
import { Hammer, Trash2, ArrowUp, Wrench } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SCRAP_PER_ITEM: Record<string, number> = {
  taco: 5,
  colete: 8,
};

const UPGRADE_COST_SCRAP = 10;
const UPGRADE_COST_MONEY = 3000;
const UPGRADE_SUCCESS_RATE = 0.7;

interface OficinaModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const OficinaModal = ({ open, onOpenChange }: OficinaModalProps) => {
  const { state, setState, addLog } = useGame();

  const equipments = state.inventory.filter((i) => i.type === "equipment");

  const handleDismantle = (item: InventoryItem) => {
    const scrapGain = SCRAP_PER_ITEM[item.id] || 3;
    setState((prev) => {
      // Remove stat bonus
      let updated = { ...prev };
      const level = item.level || 0;
      const baseStat = item.baseStat || 10;
      const totalBonus = baseStat * Math.pow(1.2, level);

      if (item.statType === "forca") {
        updated.forca = Math.max(10, Math.round(updated.forca - totalBonus));
      } else if (item.statType === "defesa") {
        updated.defesa = Math.max(10, Math.round(updated.defesa - totalBonus));
      }

      updated.sucata = updated.sucata + scrapGain;
      updated.inventory = updated.inventory.filter((i) => i.id !== item.id);
      return updated;
    });
    addLog(`🔧 Desmontou ${item.name} → +${SCRAP_PER_ITEM[item.id] || 3} Sucata`);
    toast.success(`${item.name} desmontado!`);
  };

  const handleUpgrade = (item: InventoryItem) => {
    if (state.sucata < UPGRADE_COST_SCRAP) {
      toast.error("Sucata insuficiente!");
      return;
    }
    if (state.dinheiro < UPGRADE_COST_MONEY) {
      toast.error("Dinheiro insuficiente!");
      return;
    }

    const currentLevel = item.level || 0;
    const success = Math.random() < UPGRADE_SUCCESS_RATE;

    setState((prev) => {
      let updated = {
        ...prev,
        sucata: prev.sucata - UPGRADE_COST_SCRAP,
        dinheiro: prev.dinheiro - UPGRADE_COST_MONEY,
      };

      if (success) {
        const newLevel = currentLevel + 1;
        const baseStat = item.baseStat || 10;
        const oldBonus = baseStat * Math.pow(1.2, currentLevel);
        const newBonus = baseStat * Math.pow(1.2, newLevel);
        const diff = Math.round(newBonus - oldBonus);

        if (item.statType === "forca") {
          updated.forca = updated.forca + diff;
        } else if (item.statType === "defesa") {
          updated.defesa = updated.defesa + diff;
        }

        updated.inventory = updated.inventory.map((i) =>
          i.id === item.id
            ? { ...i, level: newLevel, name: `${i.name.replace(/\s*\+\d+$/, "")} +${newLevel}` }
            : i
        );
      }

      return updated;
    });

    if (success) {
      addLog(`⬆️ ${item.name} melhorado para +${currentLevel + 1}!`);
      toast.success(`Upgrade bem-sucedido! +${currentLevel + 1}`);
    } else {
      addLog(`❌ Falha ao melhorar ${item.name}. Materiais perdidos.`);
      toast.error("Upgrade falhou! Materiais consumidos.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono-game text-primary neon-text flex items-center gap-2">
            <Hammer className="w-5 h-5" /> Oficina
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Desmonte itens para Sucata ou melhore seus equipamentos.
          </DialogDescription>
        </DialogHeader>

        {/* Resources */}
        <div className="flex items-center justify-between text-xs bg-muted/30 rounded-md px-3 py-2 border border-border">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Wrench className="w-3 h-3" /> Sucata
          </span>
          <span className="font-mono-game text-primary font-bold">{state.sucata}</span>
        </div>

        {equipments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Nenhum equipamento no inventário.
          </div>
        ) : (
          <div className="space-y-3">
            {equipments.map((item) => {
              const level = item.level || 0;
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-muted/30 border border-border space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono-game text-sm font-bold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Nível: {level} · Tipo: {item.statType === "forca" ? "Força" : "Defesa"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDismantle(item)}
                      className="flex-1 font-mono-game text-xs gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Desmontar (+{SCRAP_PER_ITEM[item.id] || 3})
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleUpgrade(item)}
                      disabled={state.sucata < UPGRADE_COST_SCRAP || state.dinheiro < UPGRADE_COST_MONEY}
                      className="flex-1 font-mono-game text-xs gap-1"
                    >
                      <ArrowUp className="w-3 h-3" /> Melhorar
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center">
                    Upgrade: {UPGRADE_COST_SCRAP} Sucata + R$ {UPGRADE_COST_MONEY.toLocaleString("pt-BR")} · 70% sucesso
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OficinaModal;
