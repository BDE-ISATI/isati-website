import { useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TeamScore } from "@/shared/types/sharedTypes";
import buildScoreCurve, { type ScoreGranularity, type ScoreValidation } from "@/features/wei/libs/scoreCurve";
import cn from "@/shared/utils/cn";

interface TeamScoreChartProps {
  teams: TeamScore[]
  validations: ScoreValidation[]
  range: { from: number; to: number }
  highlightTeamId?: string
  className?: string
}

const hourFormat = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });
const dayFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
const fullFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

function tickFormatter(granularity: ScoreGranularity) {
  return (t: number) => (granularity === "hour" ? hourFormat : dayFormat).format(t);
}

export default function TeamScoreChart({ teams, validations, range, highlightTeamId, className }: TeamScoreChartProps) {

  const teamIds = useMemo(() => teams.map((team) => team.id), [teams]);
  const curve = useMemo(() => buildScoreCurve(validations, teamIds, range), [validations, teamIds, range]);

  if (teams.length === 0) return null;

  const ordered = highlightTeamId
    ? [...teams.filter((team) => team.id !== highlightTeamId), ...teams.filter((team) => team.id === highlightTeamId)]
    : teams;

  const leader = teams[0];

  return (
    <div
      role="img"
      aria-label={
        leader
          ? `Progression des points depuis le début du parcours. ${leader.name || "L'équipe en tête"} mène avec ${leader.score ?? 0} points. Le classement détaillé suit sous le graphique.`
          : "Progression des points des équipes depuis le début du parcours."
      }
      className={cn("h-72 w-full sm:h-80", className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={curve.points} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="t"
            type="number"
            domain={["dataMin", "dataMax"]}
            scale="time"
            tickFormatter={tickFormatter(curve.granularity)}
            stroke="var(--color-muted-foreground)"
            tick={{ fontSize: 12 }}
            minTickGap={24}
          />
          <YAxis
            allowDecimals={false}
            stroke="var(--color-muted-foreground)"
            tick={{ fontSize: 12 }}
            width={48}
          />
          <Tooltip
            labelFormatter={(t: number) => fullFormat.format(t)}
            contentStyle={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-border)",
              borderRadius: "0.5rem",
              color: "var(--color-card-foreground)",
              fontSize: "0.75rem",
            }}
          />
          {!highlightTeamId && <Legend wrapperStyle={{ fontSize: "0.75rem" }} />}

          {ordered.map((team) => {
            const muted = !!highlightTeamId && team.id !== highlightTeamId;
            return (
              <Line
                key={team.id}
                dataKey={team.id}
                name={team.name || "Équipe"}
                stroke={muted ? "var(--color-border)" : team.color || "var(--color-accent)"}
                strokeWidth={muted ? 1.5 : 3}
                dot={false}
                isAnimationActive={false}
                legendType={muted ? "none" : "line"}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
