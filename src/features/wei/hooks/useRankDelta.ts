import { useEffect, useState } from "react";

export type Ranks = {
  individual: number
  team: number
  faction: number
};

export type RankDeltas = Partial<Ranks>;

function storageKey(weiId: string, userId: string) {
  return `wei-ranks:${weiId}:${userId}`;
}

function readRanks(key: string): Ranks | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Ranks) : null;
  } catch {
    return null;
  }
}

function writeRanks(key: string, ranks: Ranks) {
  try {
    window.localStorage.setItem(key, JSON.stringify(ranks));
  } catch {
    return;
  }
}

export default function useRankDelta(weiId: string, userId: string, ranks: Ranks): RankDeltas {
  const key = storageKey(weiId, userId);
  const { individual, team, faction } = ranks;
  const [previous] = useState(() => readRanks(key));

  useEffect(() => {
    if (individual > 0 || team > 0 || faction > 0) writeRanks(key, { individual, team, faction });
  }, [key, individual, team, faction]);

  if (!previous) return {};

  const delta = (name: keyof Ranks) =>
    previous[name] > 0 && ranks[name] > 0 ? previous[name] - ranks[name] : undefined;

  return { individual: delta("individual"), team: delta("team"), faction: delta("faction") };
}
