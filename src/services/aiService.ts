/**
 * aiService.ts
 *
 * Módulo isolado de IA para o jogo Cidade Sombria.
 * Toda a lógica de chamada a APIs de IA fica aqui, separada do código do jogo.
 *
 * Configuração via variáveis de ambiente (.env):
 *   VITE_AI_API_URL  — URL base OpenAI-compatível (ex: https://api.openai.com/v1/chat/completions)
 *   VITE_AI_API_KEY  — Chave de API
 *   VITE_AI_MODEL    — Modelo a usar (padrão: "gpt-4o-mini")
 *
 * Quando as variáveis não estão configuradas, o serviço usa narrações locais
 * de fallback, garantindo que o jogo funcione normalmente sem nenhuma IA.
 */

import type { GameState } from "@/contexts/GameContext";

// ─── Tipos públicos ──────────────────────────────────────────────────────────

/** Todos os tipos de ação que o jogo pode narrar. */
export type GameActionType =
  | "crime_success"
  | "crime_failure"
  | "combat_victory"
  | "combat_defeat"
  | "training"
  | "casino_win"
  | "casino_loss"
  | "random_event"
  | "level_up"
  | "property_income";

/** Descreve uma ação do jogador a ser narrada pela IA. */
export interface GameAction {
  /** Tipo da ação. */
  type: GameActionType;
  /** Rótulo legível, ex: "Furtar Carteira" ou "Ladrão Comum". */
  label?: string;
  /** Valor numérico relevante, ex: recompensa em dinheiro ou dano. */
  value?: number;
}

// ─── Narrações de fallback ───────────────────────────────────────────────────

const fallbackNarrations: Record<
  GameActionType,
  (action: GameAction, state: GameState) => string
> = {
  crime_success: (a) =>
    `A operação "${a.label}" foi executada com perfeição. As ruas sussurram seu nome.`,
  crime_failure: (a) =>
    `A tentativa de "${a.label}" deu errado. Você foi fisgado antes de escapar.`,
  combat_victory: (a) =>
    `${a.label} não foi páreo para você. Sua reputação cresce na cidade sombria.`,
  combat_defeat: (a) =>
    `${a.label} te derrubou hoje. As ruas ensinam quem aprende com a derrota.`,
  training: (a) =>
    `Mais um treino de ${a.label} concluído. Seu corpo se transforma dia após dia.`,
  casino_win: () =>
    `A sorte sorriu para você hoje no cassino. Aproveite enquanto dura.`,
  casino_loss: () =>
    `O cassino levou tudo. A noite foi cruel, mas você voltará mais forte.`,
  random_event: (a) =>
    a.label ?? "Algo inesperado aconteceu nas ruas da cidade.",
  level_up: (_, s) =>
    `Nível ${s.nivel}! Você evoluiu e a cidade inteira começa a te respeitar.`,
  property_income: (a) =>
    `Seus negócios renderam R$ ${(a.value ?? 0).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })} enquanto você estava fora.`,
};

// ─── Helpers internos ────────────────────────────────────────────────────────

const AI_API_URL = import.meta.env.VITE_AI_API_URL as string | undefined;
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY as string | undefined;
const AI_MODEL = (import.meta.env.VITE_AI_MODEL as string | undefined) ?? "gpt-4o-mini";

function buildNarrationPrompt(action: GameAction, state: GameState): string {
  const lines = [
    "Você é o narrador de um RPG de máfia urbana brasileiro chamado 'Cidade Sombria'.",
    "Escreva uma narração curta (1-2 frases, estilo noir) em português para a seguinte ação do jogador:",
    `- Ação: ${action.type.replace(/_/g, " ")}${action.label ? ` (${action.label})` : ""}`,
    `- Nível: ${state.nivel} | Respeito: ${state.respeito} | Dinheiro: R$ ${state.dinheiro.toLocaleString("pt-BR")}`,
  ];
  if (action.value !== undefined) {
    lines.push(`- Valor envolvido: R$ ${action.value.toLocaleString("pt-BR")}`);
  }
  return lines.join("\n");
}

async function callAI(prompt: string, maxTokens: number): Promise<string | null> {
  if (!AI_API_KEY || !AI_API_URL) return null;

  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.8,
      }),
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();
    const text =
      (data as { choices?: Array<{ message?: { content?: string } }> })
        ?.choices?.[0]?.message?.content;
    return text?.trim() ?? null;
  } catch {
    return null;
  }
}

// ─── API pública ─────────────────────────────────────────────────────────────

/**
 * Gera uma narração para a ação do jogador.
 *
 * Retorna o texto da IA quando configurada, ou uma narração local de fallback
 * caso contrário, garantindo que o jogo funcione sem dependência de IA.
 *
 * @example
 * const narration = await generateNarration(
 *   { type: "crime_success", label: "Furtar Carteira", value: 120 },
 *   state
 * );
 * addLog(narration);
 */
export async function generateNarration(
  action: GameAction,
  state: GameState
): Promise<string> {
  const aiText = await callAI(buildNarrationPrompt(action, state), 80);
  return aiText ?? fallbackNarrations[action.type](action, state);
}

/**
 * Gera uma fala de NPC contextualizada.
 *
 * @param npcName  Nome do NPC, ex: "Ladrão Comum".
 * @param context  Contexto da situação para a IA gerar uma fala relevante.
 *
 * @example
 * const dialogue = await generateNPCDialogue(
 *   "Chefe do Tráfico",
 *   "O jogador acabou de derrotar o chefe em combate."
 * );
 */
export async function generateNPCDialogue(
  npcName: string,
  context: string
): Promise<string> {
  const prompt = [
    "Você é o narrador de um RPG de máfia urbana brasileiro chamado 'Cidade Sombria'.",
    `Escreva uma fala curta (1 frase) do NPC "${npcName}" para o jogador, com o seguinte contexto:`,
    context,
  ].join("\n");

  const aiText = await callAI(prompt, 60);
  return aiText ?? `${npcName} olha para você em silêncio.`;
}
