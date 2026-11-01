import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import useOrganigramme from "@/features/home/hooks/queries/useOrganigramme";
import OrganigrammeMemberForm from "@/features/home/components/OrganigrammeMemberForm";
import useHasPermission from "@/features/roles/hooks/useHasPermission";

import pb from "@/shared/lib/pocketbase";
import { OrganigrammeMemberPoleOptions, type OrganigrammeMemberResponse } from "@/shared/types/pocketbase-types";
import AjouterMembre from "@/assets/PageAccueil/ajouterMembre.svg?react";

type Editing = {
  pole: OrganigrammeMemberPoleOptions
  member?: OrganigrammeMemberResponse
}

const POLES = Object.values(OrganigrammeMemberPoleOptions);

export default function OrganigrammeSection() {

  const { data: members = [], isPending, error } = useOrganigramme();
  const canEdit = useHasPermission("update", "organigramme_member");
  const [ editing, setEditing ] = useState<Editing | null>(null);

  if (isPending || error) return null;

  return (
    <section id="equipe" className="bg-accent-second px-6 py-16 text-accent-foreground lg:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
          <span className="text-brand-200">{members.length}</span> d'entre eux font vivre{" "}
          <span className="text-brand-200">l'association</span> toute l'année
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-white/85">
          Chacun son pôle, son rôle et ses responsabilités, mais ensemble ils proposent une grande diversité
          d'activités au sein de l'ESIR.
        </p>

        <div className="mt-14 w-full columns-1 gap-8 space-y-8 p-4 md:columns-2 lg:columns-3">
          {POLES.map((pole) => (
            <div key={pole} className="flex break-inside-avoid flex-col items-center overflow-hidden rounded-sm bg-accent-third">
              <h3 className="w-full bg-accent py-4 text-center text-3xl font-extrabold uppercase tracking-wider text-brand-200">
                {pole}
              </h3>

              <div className="flex w-full flex-wrap justify-center gap-8 p-6">
                {members.filter((member) => member.pole === pole).map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    disabled={!canEdit}
                    onClick={() => setEditing({ pole, member })}
                    className="group flex w-32 flex-col items-center enabled:cursor-pointer"
                  >
                    <div className="mb-1 h-24 w-24 overflow-hidden rounded-full border-2 border-transparent transition-colors duration-300 group-enabled:group-hover:border-brand-300">
                      {member.avatar && (
                        <img
                          src={pb.files.getURL(member, member.avatar, { thumb: "300x300" })}
                          alt={`Photo de ${member.name}`}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="text-center text-sm font-bold leading-tight text-white">{member.name}</span>
                    <span className="mt-1 text-center text-xs uppercase text-brand-300">{member.role}</span>
                  </button>
                ))}

                {canEdit && (
                  <button
                    type="button"
                    onClick={() => setEditing({ pole })}
                    className="group flex w-32 cursor-pointer flex-col items-center"
                  >
                    <div className="mb-1 h-24 w-24 overflow-hidden rounded-full border-2 border-transparent transition-colors duration-300 group-hover:border-brand-300">
                      <AjouterMembre className="h-full w-full" />
                    </div>
                    <span className="text-center text-sm font-bold leading-tight text-white">Ajouter</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!editing} onClose={() => setEditing(null)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-card-foreground shadow-2xl">
            {editing && (
              <>
                <DialogTitle className="mb-4 text-xl font-semibold">
                  {editing.member ? `Modifier ${editing.member.name}` : `Ajouter au pôle ${editing.pole}`}
                </DialogTitle>
                <OrganigrammeMemberForm
                  key={editing.member?.id ?? editing.pole}
                  pole={editing.pole}
                  member={editing.member}
                  onDone={() => setEditing(null)}
                />
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
