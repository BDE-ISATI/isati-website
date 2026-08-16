import pb from "@/shared/lib/pocketbase"
import useGetRoles from "@/features/roles/hooks/useGetRoles";
import RoleBadge from "@/features/roles/components/RoleBadge";
import type { UsersRecord } from "@/shared/types/pocketbase-types";
import { years, levels, specialities } from "@/shared/constants/education";

interface ProfileBannerProps {
  user: UsersRecord
}


export default function ProfileBanner({ user } : ProfileBannerProps) {

  const avatarURL = user.avatar ? pb.files.getURL(user, user.avatar, { thumb: '200x200' }) : undefined;
  const { roles } = useGetRoles(user.roles);
  const year = years.find((s) => s.key === user.school_year)?.name
  const level = levels.find((s) => s.key === user.level)?.name
  const speciality = specialities.find((s) => s.key === user.speciality)?.name

  const memberSince = new Date(user.created).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="w-full bg-card text-card-foreground border border-border rounded-md p-3 sm:p-6 shadow-sm">
      <div className="flex flex-row items-start gap-3 sm:gap-6">
        <img
          src={avatarURL}
          alt={user.username}
          className="w-16 h-16 sm:w-28 sm:h-28 rounded-full border border-border object-cover shrink-0"
        />

        <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
          <header className="flex flex-col gap-0.5">
            <h2 className="text-lg sm:text-2xl font-semibold leading-tight truncate">
              {user.username}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Membre depuis le {memberSince}
            </p>
          </header>

          <dl className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 text-sm">
            <div className="flex flex-col">
              <dt className="text-muted-foreground">Année</dt>
              <dd>{year || '—'}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-muted-foreground">Niveau</dt>
              <dd>{level || '—'}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-muted-foreground">Spécialité</dt>
              <dd>{speciality || '—'}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-muted-foreground">Type de compte</dt>
              <dd>{user.account_type || '—'}</dd>
            </div>
          </dl>

          {roles && roles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <RoleBadge key={role.id} role={role} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
