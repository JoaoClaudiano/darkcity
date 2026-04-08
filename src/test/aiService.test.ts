import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateNarration, generateNPCDialogue } from "@/services/aiService";
import type { GameAction } from "@/services/aiService";

// Minimal game state fixture
const mockState = {
  nivel: 3,
  xp: 40,
  xpMax: 150,
  energia: 70,
  energiaMax: 100,
  nervos: 50,
  nervosMax: 100,
  dinheiro: 2500,
  forca: 12,
  defesa: 10,
  agilidade: 11,
  respeito: 80,
  sucata: 5,
  ppisoEnd: null,
  hospitalEnd: null,
  inventory: [],
  properties: {},
  lastIncomeTime: Date.now(),
};

describe("aiService — fallback (sem VITE_AI_API_KEY)", () => {
  beforeEach(() => {
    // Ensure env vars are absent so fallback path is exercised
    vi.stubEnv("VITE_AI_API_KEY", "");
    vi.stubEnv("VITE_AI_API_URL", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("generateNarration retorna string não vazia para crime_success", async () => {
    const action: GameAction = { type: "crime_success", label: "Furtar Carteira", value: 120 };
    const result = await generateNarration(action, mockState);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("generateNarration retorna string não vazia para crime_failure", async () => {
    const action: GameAction = { type: "crime_failure", label: "Assaltar Loja" };
    const result = await generateNarration(action, mockState);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generateNarration retorna string não vazia para combat_victory", async () => {
    const action: GameAction = { type: "combat_victory", label: "Ladrão Comum" };
    const result = await generateNarration(action, mockState);
    expect(result).toContain("Ladrão Comum");
  });

  it("generateNarration retorna string não vazia para combat_defeat", async () => {
    const action: GameAction = { type: "combat_defeat", label: "Chefe do Tráfico" };
    const result = await generateNarration(action, mockState);
    expect(result).toContain("Chefe do Tráfico");
  });

  it("generateNarration retorna string não vazia para training", async () => {
    const action: GameAction = { type: "training", label: "Força" };
    const result = await generateNarration(action, mockState);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generateNarration retorna string não vazia para casino_win", async () => {
    const action: GameAction = { type: "casino_win", value: 1000 };
    const result = await generateNarration(action, mockState);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generateNarration retorna string não vazia para casino_loss", async () => {
    const action: GameAction = { type: "casino_loss", value: 500 };
    const result = await generateNarration(action, mockState);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generateNarration para level_up inclui o nível atual", async () => {
    const action: GameAction = { type: "level_up" };
    const result = await generateNarration(action, mockState);
    expect(result).toContain(String(mockState.nivel));
  });

  it("generateNarration para property_income inclui o valor formatado", async () => {
    const action: GameAction = { type: "property_income", value: 1200 };
    const result = await generateNarration(action, mockState);
    expect(result).toContain("1.200,00");
  });

  it("generateNarration para random_event usa o label quando fornecido", async () => {
    const action: GameAction = { type: "random_event", label: "Evento especial" };
    const result = await generateNarration(action, mockState);
    expect(result).toBe("Evento especial");
  });

  it("generateNarration para random_event sem label retorna texto padrão", async () => {
    const action: GameAction = { type: "random_event" };
    const result = await generateNarration(action, mockState);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generateNPCDialogue retorna fallback com o nome do NPC", async () => {
    const result = await generateNPCDialogue("Ladrão Comum", "contexto de teste");
    expect(result).toContain("Ladrão Comum");
  });
});
