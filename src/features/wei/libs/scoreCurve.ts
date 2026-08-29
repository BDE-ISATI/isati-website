import { parsePbDate } from "@/shared/lib/dates";

export type ScoreValidation = {
  team: string
  points_awarded: number
  reviewed_at: string
};

export type ScoreGranularity = "hour" | "day";

export type ScorePoint = { t: number } & Record<string, number>;

export type ScoreCurve = {
  points: ScorePoint[]
  granularity: ScoreGranularity
};

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const HOURLY_MAX_SPAN = 3 * DAY;
const MAX_POINTS = 400;

export default function buildScoreCurve(
  validations: ScoreValidation[],
  teamIds: string[],
  range: { from: number; to: number },
): ScoreCurve {

  const granularity: ScoreGranularity = range.to - range.from <= HOURLY_MAX_SPAN ? "hour" : "day";
  const step = granularity === "hour" ? HOUR : DAY;

  const totals = new Map<string, number>(teamIds.map((id) => [id, 0]));

  if (!Number.isFinite(range.from) || !Number.isFinite(range.to) || range.to <= range.from) {
    return { points: [{ t: range.to, ...Object.fromEntries(totals) }], granularity };
  }

  const dated = validations
    .map((validation) => ({
      team: validation.team,
      points: Number(validation.points_awarded) || 0,
      at: parsePbDate(validation.reviewed_at)?.getTime() ?? null,
    }))
    .filter((validation) => validation.at !== null && totals.has(validation.team))
    .sort((a, b) => a.at! - b.at!);

  const points: ScorePoint[] = [];
  let cursor = 0;

  for (let slot = range.from; slot < range.to; slot += step) {
    while (cursor < dated.length && dated[cursor]!.at! <= slot) {
      const validation = dated[cursor]!;
      totals.set(validation.team, (totals.get(validation.team) ?? 0) + validation.points);
      cursor += 1;
    }
    points.push({ t: slot, ...Object.fromEntries(totals) });

    if (points.length >= MAX_POINTS) break;
  }

  while (cursor < dated.length && dated[cursor]!.at! <= range.to) {
    const validation = dated[cursor]!;
    totals.set(validation.team, (totals.get(validation.team) ?? 0) + validation.points);
    cursor += 1;
  }
  points.push({ t: range.to, ...Object.fromEntries(totals) });

  return { points, granularity };

}
