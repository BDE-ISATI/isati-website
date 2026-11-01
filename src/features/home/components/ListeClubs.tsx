import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import useClubs from "@/features/home/hooks/queries/useClubs";
import pb from "@/shared/lib/pocketbase";
import type { ClubDetailsResponse } from "@/shared/types/pocketbase-types";
import Button, { buttonVariants } from "@/shared/components/ui/Button";
import XIcon from "@/assets/icons/x.svg?react";

export default function ListeClubs() {

  const { data: clubs = [], isPending, error } = useClubs();
  const [ openClub, setOpenClub ] = useState<ClubDetailsResponse | null>(null);

  if (isPending || error) return null;

  return (
    <section id="clubs" className="flex flex-col items-center bg-brand-200 px-6 pb-20 font-bold">

      <h2 className="mt-16 text-center text-4xl sm:text-6xl">
        <span className="text-5xl text-brand-500 sm:text-7xl">ISATI</span> c'est aussi{" "}
        <span className="text-5xl text-brand-500 sm:text-7xl">{clubs.length}</span> clubs
      </h2>
      <p className="mt-4 text-xl text-accent/80">Clique sur un club pour rejoindre son groupe.</p>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4">
        {clubs.map((club) => (
          <button
            key={club.id}
            type="button"
            onClick={() => setOpenClub(club)}
            className="flex cursor-pointer flex-col items-center justify-center rounded-md p-2 transition-colors hover:bg-brand-300 hover:text-accent"
          >
            {club.icon && (
              <img src={pb.files.getURL(club, club.icon)} alt="" className="h-32 w-auto sm:h-48 lg:h-64" />
            )}
            <span className="text-center text-2xl sm:text-4xl">{club.name}</span>
          </button>
        ))}
      </div>

      <Dialog open={!!openClub} onClose={() => setOpenClub(null)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-brand-200/20 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative flex max-h-full w-full max-w-4xl flex-col gap-6 overflow-y-auto md:flex-row">
            {openClub && (
              <>
                <Button
                  type="button"
                  onClick={() => setOpenClub(null)}
                  variant="ghost"
                  size="icon"
                  aria-label="Fermer"
                  className="absolute top-2 right-2"
                >
                  <XIcon className="h-6 w-6" />
                </Button>

                {openClub.poster && (
                  <img
                    src={pb.files.getURL(openClub, openClub.poster)}
                    alt={`Affiche du club ${openClub.name}`}
                    className="max-h-[60vh] w-auto self-center rounded-md"
                  />
                )}

                <div className="flex flex-col gap-4 rounded-lg bg-brand-300/50 p-4">
                  <DialogTitle className="text-4xl">{openClub.name}</DialogTitle>
                  <p className="font-normal">{openClub.description}</p>

                  {openClub.discord && (
                    <a
                      href={openClub.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "accent", size: "large", className: "mt-auto" })}
                    >
                      Rejoindre le groupe
                    </a>
                  )}
                </div>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
