import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import { darken } from "color2k";

import pb from "@/shared/lib/pocketbase";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import useWei from "@/features/wei/hooks/queries/useWei";
import useUserParticipation from "@/features/wei/hooks/queries/useUserParticipation";
import useParticipationScores from "@/features/wei/hooks/queries/useParticipationScores";
import useTeamScores from "@/features/wei/hooks/queries/useTeamScores";
import useFactions from "@/features/wei/hooks/queries/useFactions";
import useUserValidations from "@/features/wei/hooks/queries/useUserValidations";
import useUserScoreEvents from "@/features/wei/hooks/queries/useUserScoreEvents";
import useChallenges from "@/features/wei/hooks/queries/useChallenges";
import useValidationsRealtime from "@/features/wei/hooks/useValidationsRealtime";
import TeamScoreChart from "@/features/wei/components/TeamScoreChart";
import TeamCard from "@/features/wei/components/TeamCard";
import ValidationTile from "@/features/wei/components/ValidationTile";
import ParticipantActivityList from "@/features/wei/components/ParticipantActivityList";
import ParticipantLeaderboard from "@/features/wei/components/ParticipantLeaderboard";
import { buildFactionScores, formatRank, rankOf } from "@/features/wei/libs/ranking";
import { SCOPE_LABELS } from "@/features/wei/libs/challenge";
import type { UserScoreEvent } from "@/features/wei/weiTypes";
import type { ChallengeWithRelations } from "@/shared/types/sharedTypes";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";
import { parsePbDate } from "@/shared/lib/dates";
import useNow from "@/shared/hooks/useNow";
import Error from "@/shared/components/ui/Error";
import ProgressBar from "@/shared/components/ui/ProgressBar";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";
import NotFound from "@/pages/NotFound";
import PageNav from "@/components/layout/PageNav";

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function ParticipantDetail() {

  const { weiId, userId } = useParams();
  const authUserId = useAuthStore((s) => s.user?.id);
  const canReviewValidations = useHasPermission("view", "validations");
  const now = useNow(60_000);

  const wei = useWei(weiId);
  const participation = useUserParticipation(weiId, userId);
  const scores = useParticipationScores(weiId);
  const teams = useTeamScores(weiId);
  const factions = useFactions(weiId);
  const validations = useUserValidations(weiId, userId);
  const scoreEvents = useUserScoreEvents(weiId, userId);
  const challenges = useChallenges(weiId);
  useValidationsRealtime(true);

  useEffect(() => {
    document.title = `${participation.data?.expand?.user?.username || "Participant"} | ISATI`;
  }, [participation.data]);

  const range = useMemo(() => {
    const to = Date.now();
    return { from: parsePbDate(wei.data?.parcours_starts_at)?.getTime() ?? to - 7 * 24 * 60 * 60 * 1000, to };
  }, [wei.data?.parcours_starts_at]);

  const events = useMemo(() => (scoreEvents.data ?? [])
    .filter((event) => event.scope === "individual")
    .map((event) => ({
      team: userId ?? "",
      points_awarded: event.points_awarded ?? 0,
      reviewed_at: event.reviewed_at,
    })), [scoreEvents.data, userId]);

  if (participation.isLoading) return (
    <div className="flex flex-1 items-center justify-center">
      <IsatiAnimation />
    </div>
  );

  if (!participation.data) {
    return participation.error ? (
      <div className="mx-auto w-full max-w-3xl px-4 py-4 md:py-6">
        <Error message={getFirstErrorMessage(participation.error)} />
      </div>
    ) : <NotFound />;
  }

  const current = participation.data;
  const user = current.expand?.user;
  const isSelf = authUserId === current.user;
  const fullHistory = isSelf || canReviewValidations;

  const scoreList = scores.data ?? [];
  const teamList = teams.data ?? [];
  const myScore = scoreList.find((entry) => entry.id === current.id);
  const rank = myScore ? rankOf(scoreList, current.id) : 0;

  const team = current.team ? teamList.find((entry) => entry.id === current.team) : undefined;
  const teamName = team?.name || current.expand?.team?.name;
  const teamColor = team?.color || current.expand?.team?.color;
  const teamRank = rankOf(teamList, current.team);

  const factionScores = buildFactionScores(teamList, factions.data ?? []);
  const faction = factionScores.find((entry) => entry.id === (team?.faction || current.expand?.team?.faction));

  const list = validations.data ?? [];
  const awarded = scoreEvents.data ?? [];
  const done = new Set(awarded.map((event) => event.challenge));
  const pending = list.filter((validation) => validation.status === "pending").length;
  const refused = new Set(
    list.filter((validation) => validation.status === "refused" && !done.has(validation.challenge))
      .map((validation) => validation.challenge),
  ).size;
  const total = challenges.data?.length ?? 0;
  const challengeById = new Map<string, ChallengeWithRelations>((challenges.data ?? []).map((challenge) => [challenge.id, challenge]));

  const avatarURL = user?.avatar ? pb.files.getURL(user, user.avatar, { thumb: "200x200" }) : undefined;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">
      <PageNav back={team ? `/wei/team/${team.id}` : "/wei/team"} backLabel={teamName || "Classement"} />

      <Error message={getFirstErrorMessage(scores.error ?? teams.error ?? validations.error ?? scoreEvents.error ?? challenges.error ?? wei.error)} />

      <header
        style={{
          backgroundColor: teamColor || "var(--color-accent)",
          borderColor: teamColor ? darken(teamColor, 0.09) : undefined,
        }}
        className="flex flex-row items-center gap-3 rounded-md border-2 p-4 text-white shadow-sm sm:gap-6 sm:p-6"
      >
        <img
          src={avatarURL}
          alt=""
          className="h-16 w-16 shrink-0 rounded-full border-2 border-white/40 object-cover sm:h-24 sm:w-24"
        />

        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="truncate text-xl font-semibold sm:text-2xl">
            {user?.username || "Participant inconnu"}
          </h1>

          <div className="flex flex-row flex-wrap items-center gap-2">
            {current.role === "team_leader" && (
              <span className="inline-flex shrink-0 items-center rounded-md bg-black/25 px-2 py-0.5 text-xs font-medium">
                Chef d'équipe
              </span>
            )}

            {faction && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-black/25 px-2 py-0.5 text-xs font-medium">
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: faction.color }}
                  className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/60"
                />
                {faction.name}
              </span>
            )}
          </div>

          {team ? (
            <Link to={`/wei/team/${team.id}`} className="w-fit text-sm underline opacity-90 hover:opacity-100">
              {teamName || "Équipe sans nom"}
            </Link>
          ) : (
            <p className="text-sm opacity-90">Aucune équipe</p>
          )}
        </div>
      </header>

      <section className="grid grid-cols-3 gap-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <Stat label="Points" value={myScore ? String(myScore.score ?? 0) : "-"} />
        <Stat label="Classement" value={formatRank(rank, scoreList.length)} />
        <Stat label="Défis validés" value={String(done.size)} />

        {current.role === "team_leader" && (
          <p className="col-span-3 text-center text-xs text-muted-foreground">
            Les chefs d'équipe ne marquent pas de points individuels.
          </p>
        )}

        {current.role !== "team_leader" && (pending > 0 || refused > 0) && (
          <p className="col-span-3 text-center text-xs text-muted-foreground">
            {pending > 0 && `${pending} en attente`}
            {pending > 0 && refused > 0 && " · "}
            {refused > 0 && `${refused} à corriger`}
          </p>
        )}
      </section>

      {events.length > 0 && (
        <section className="w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Progression</h2>
          <TeamScoreChart
            series={[{ id: current.user, name: user?.username, color: teamColor }]}
            validations={events}
            range={range}
            highlightId={current.user}
            label={`Progression des points de ${user?.username || "ce participant"} depuis le début du parcours.`}
            className="mt-4"
          />
        </section>
      )}

      <section className="w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold">Dernières preuves</h2>

        {list.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {fullHistory ? "Aucune preuve envoyée pour l'instant." : "Aucune preuve publique."}
          </p>
        ) : (
          <ul className="mt-4 flex flex-row gap-3 overflow-x-auto pb-2">
            {list.slice(0, 8).map((validation) => (
              <li key={validation.id} className="w-40 shrink-0 sm:w-44">
                <ValidationTile validation={validation} showChallenge now={now} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <div className="flex flex-row items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Défis réalisés</h2>
          <span className="shrink-0 text-sm font-medium tabular-nums">
            {done.size} / {total}
          </span>
        </div>

        <ProgressBar
          value={total > 0 ? done.size / total : 0}
          label={`${done.size} défis validés sur ${total}`}
          className="mt-3"
        />

        {awarded.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Aucun défi validé pour l'instant.</p>
        ) : (
          <ul className="mt-4 flex flex-col divide-y divide-border">
            {awarded.map((event) => (
              <AwardedRow key={event.id} event={event} challenge={challengeById.get(event.challenge)} />
            ))}
          </ul>
        )}
      </section>

      {fullHistory && (
        <section className="w-full rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold">Historique des soumissions</h2>
          <ParticipantActivityList validations={list} now={now} canFix={isSelf} className="mt-4" />
        </section>
      )}

      {team && <TeamCard team={team} rank={teamRank} />}

      <ParticipantLeaderboard
        weiId={current.wei}
        scores={scoreList}
        teams={teamList}
        highlightUserId={current.user}
      />

    </div>
  );
}

function AwardedRow({ event, challenge }: { event: UserScoreEvent, challenge?: ChallengeWithRelations }) {

  const date = parsePbDate(event.reviewed_at);

  return (
    <li className="flex flex-row items-center gap-3 py-3 text-sm first:pt-0 last:pb-0">
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 flex-row items-center gap-2">
          {challenge ? (
            <Link to={`/wei/challenge/${challenge.id}`} className="truncate font-medium hover:underline">
              {challenge.title || "Défi"}
            </Link>
          ) : (
            <span className="truncate font-medium">Défi inconnu</span>
          )}

          {event.scope === "team" && (
            <span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {SCOPE_LABELS.team}
            </span>
          )}
        </span>
        <span className="truncate text-xs text-muted-foreground">{date ? dateFormat.format(date) : "-"}</span>
      </span>

      <span className="shrink-0 text-sm font-medium tabular-nums">{event.points_awarded ?? 0} pts</span>
    </li>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-2xl leading-none font-bold sm:text-3xl">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
