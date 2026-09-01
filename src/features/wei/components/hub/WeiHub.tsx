import type { ReactNode } from "react";
import { Link } from "react-router";
import type { ParticipationWithTeam, WeiWithLocation } from "@/shared/types/sharedTypes";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useParticipationScores from "@/features/wei/hooks/queries/useParticipationScores";
import useFactions from "@/features/wei/hooks/queries/useFactions";
import useChallenges from "@/features/wei/hooks/queries/useChallenges";
import useUserValidations from "@/features/wei/hooks/queries/useUserValidations";
import usePublicValidations from "@/features/wei/hooks/queries/usePublicValidations";
import useValidationsRealtime from "@/features/wei/hooks/useValidationsRealtime";
import useRankDelta from "@/features/wei/hooks/useRankDelta";
import useNow from "@/shared/hooks/useNow";
import { buildFactionScores, formatOrdinal, formatRank, rankOf } from "@/features/wei/libs/ranking";
import { challengeProgress, expiringChallenges, suggestChallenges } from "@/features/wei/libs/suggestions";
import TeamBanner from "@/features/wei/components/TeamBanner";
import WeiTimeline from "@/features/wei/components/WeiTimeline";
import HubSuggestions from "@/features/wei/components/hub/HubSuggestions";
import HubProofCarousel from "@/features/wei/components/hub/HubProofCarousel";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import Error from "@/shared/components/ui/Error";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";

type WeiHubProps = {
  wei: WeiWithLocation
  participation: ParticipationWithTeam
};

export default function WeiHub({ wei, participation }: WeiHubProps) {
  const user = useAuthStore((s) => s.user);
  const now = useNow();
  const teams = useTeamScores(wei.id);
  const scores = useParticipationScores(wei.id);
  const factions = useFactions(wei.id);
  const challenges = useChallenges(wei.id);
  const myValidations = useUserValidations(wei.id, participation.user);
  const publicValidations = usePublicValidations(wei.id);
  useValidationsRealtime(true);

  const teamList = teams.data ?? [];
  const scoreList = scores.data ?? [];
  const factionScores = buildFactionScores(teamList, factions.data ?? []);

  const team = teamList.find((entry) => entry.id === participation.team);
  const teamRank = rankOf(teamList, participation.team);
  const myScore = scoreList.find((entry) => entry.id === participation.id)?.score ?? 0;
  const individualRank = myScore > 0 ? rankOf(scoreList, participation.id) : 0;
  const faction = factionScores.find((entry) => entry.id === team?.faction);
  const factionRank = rankOf(factionScores, faction?.id);

  const deltas = useRankDelta(wei.id, participation.user, { individual: individualRank, team: teamRank, faction: factionRank });

  if (teams.isPending || scores.isPending || challenges.isPending || myValidations.isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <IsatiAnimation />
      </div>
    );
  }

  const progress = challengeProgress(myValidations.data ?? []);
  const suggestions = suggestChallenges(challenges.data ?? [], progress, now);
  const expiring = expiringChallenges(challenges.data ?? [], progress, now);

  const seeded = teamList.some((entry) => (entry.score ?? 0) > 0) || scoreList.some((entry) => (entry.score ?? 0) > 0);
  const pending = (myValidations.data ?? []).filter((validation) => validation.status === "pending").length;
  const accepted = (myValidations.data ?? []).filter((validation) => validation.status === "accepted").length;
  const refused = progress.refused.size;
  const total = challenges.data?.length ?? 0;
  const teamName = team?.name || participation.expand?.team?.name;
  const teamColor = team?.color || participation.expand?.team?.color;

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6">
      <Error message={getFirstErrorMessage(teams.error ?? scores.error ?? challenges.error ?? myValidations.error ?? factions.error)} />

      {seeded ? (
        <section aria-label="Classements" className="flex flex-row justify-between gap-2 sm:gap-4">
          <RankPill
            label="Individuel"
            value={formatRank(individualRank, scoreList.length)}
            sub={points(myScore)}
            delta={deltas.individual}
          />
          <RankPill
            label="Équipe"
            value={formatRank(teamRank, teamList.length)}
            sub={points(team?.score ?? 0)}
            delta={deltas.team}
          />
          {factionScores.length > 0 && (
            <RankPill
              label="Faction"
              value={formatRank(factionRank, factionScores.length)}
              sub={points(faction?.score ?? 0)}
              delta={deltas.faction}
            />
          )}
        </section>
      ) : (
        <p className="rounded-md border border-border bg-muted p-4 text-center text-sm text-muted-foreground">
          Le classement démarre avec les premières validations.
        </p>
      )}

      <Link
        to={`/wei/team/${participation.team}`}
        aria-label={`Voir l'équipe ${teamName || ""}`.trim()}
        className="block rounded-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
      >
        <TeamBanner
          name={teamName}
          color={teamColor}
          titleAs="h2"
          faction={faction ? { name: faction.name, color: faction.color } : undefined}
        >
          <div className="flex flex-row items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-3xl leading-none font-bold tabular-nums">{team?.score ?? 0}</span>
              <span className="text-xs opacity-90">{(team?.score ?? 0) > 1 ? "points" : "point"}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-3xl leading-none font-bold tabular-nums">{teamRank > 0 ? formatOrdinal(teamRank) : "-"}</span>
              <span className="text-xs opacity-90">sur {teamList.length} équipe{teamList.length > 1 ? "s" : ""}</span>
            </div>
          </div>
        </TeamBanner>
      </Link>

      {expiring.length > 0 && (
        <Link
          to="/wei/challenge"
          className="flex flex-row items-center gap-3 rounded-md border-2 border-warning bg-muted p-3 text-sm font-medium transition duration-200 hover:bg-warning/20 motion-reduce:transition-none"
        >
          <span aria-hidden="true">⏱</span>
          <span className="flex-1">
            {expiring.length > 1 ? `${expiring.length} défis expirent` : "1 défi expire"} dans moins de 48 h
          </span>
          <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </Link>
      )}

      <HubSuggestions challenges={suggestions} total={total} now={now} />

      <HubProofCarousel validations={publicValidations} now={now} />

      <section aria-label="Raccourcis" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Shortcut to={`/profile/${user?.username ?? ""}/activities`} label="Mes validations">
          {pending === 0 && refused === 0 && "Aucune en attente"}
          {pending > 0 && `${pending} en attente`}
          {pending > 0 && refused > 0 && " · "}
          {refused > 0 && <span className="text-status-critical">{refused} à corriger</span>}
        </Shortcut>
        <Shortcut to="/wei/challenge" label="Mes défis">
          {accepted} fait{accepted > 1 ? "s" : ""} / {total}
        </Shortcut>
        <Shortcut to="/wei/team" label="Classement">
          {formatRank(teamRank, teamList.length)}
        </Shortcut>
      </section>

      <WeiTimeline wei={wei} className="mb-10" />
    </div>
  );
}

function points(value: number) {
  return `${value} pt${value > 1 ? "s" : ""}`;
}

function RankPill({ label, value, sub, delta }: { label: string, value: string, sub: string, delta?: number }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-0.5 rounded-md border border-border bg-muted px-2 py-3 text-center">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
      <span className="text-xl leading-none font-bold tabular-nums sm:text-2xl">{value}</span>
      <span className="flex flex-row items-center gap-1 text-xs text-muted-foreground">
        {sub}
        {!!delta && (
          <span className={cn("font-semibold", delta > 0 ? "text-status-success" : "text-status-critical")}>
            {delta > 0 ? `▲ ${delta}` : `▼ ${-delta}`}
          </span>
        )}
      </span>
    </div>
  );
}

function Shortcut({ to, label, children }: { to: string, label: string, children: ReactNode }) {
  return (
    <Link
      to={to}
      className="flex flex-row items-center gap-3 rounded-md border border-border bg-muted p-3 transition duration-200 hover:bg-border motion-reduce:transition-none"
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="truncate text-sm font-semibold">{children}</span>
      </span>
      <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
    </Link>
  );
}
