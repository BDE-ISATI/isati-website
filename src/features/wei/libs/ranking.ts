import type { FactionsResponse } from "@/shared/types/pocketbase-types";
import type { TeamScore } from "@/shared/types/sharedTypes";
import type { FactionScore } from "@/features/wei/weiTypes";

export function formatOrdinal(rank: number): string {
  return `${rank}${rank === 1 ? "er" : "e"}`;
}

export function formatRank(rank: number, total: number): string {
  return rank > 0 && total > 0 ? `${formatOrdinal(rank)} / ${total}` : "-";
}

export function rankOf<T extends { id: string }>(sorted: T[], id?: string): number {
  if (!id) return 0;
  return sorted.findIndex((entry) => entry.id === id) + 1;
}

export function buildFactionScores(teams: TeamScore[], factions: FactionsResponse[]): FactionScore[] {
  return factions
    .map((faction) => {
      const members = teams.filter((team) => team.faction === faction.id);
      return {
        id: faction.id,
        name: faction.name || "Faction sans nom",
        color: faction.color || "var(--color-accent)",
        score: members.reduce((sum, team) => sum + (team.score ?? 0), 0),
        teamsCount: members.length,
      };
    })
    .sort((a, b) => b.score - a.score);
}
