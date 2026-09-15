import { useState } from "react";
import pb from "@/shared/lib/pocketbase";

import type { ClubDetailsResponse } from "@/shared/types/pocketbase-types";
import { useEffect } from "react"

import useClubs from "../hook/useClubs"


export default function ListeClubs (){
    const styleClub = "flex flex-col w-auto justify-center  items-center hover:bg-red-300 hover:text-accent cursor-pointer";

    const { data = [], isLoading, error } = useClubs();

    const [clubOpen, setClubOpen] = useState<ClubDetailsResponse>();




    useEffect(() => {
        if (clubOpen) {
            // Bloque le scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Réactive le scroll
            document.body.style.overflow = 'unset';
        }

        // Sécurité : réactive le scroll si le composant est démonté
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [clubOpen]);








    {isLoading && <p className="mt-10 text-accent">Chargement des clubs...</p>}
    {error && <p className="mt-10 text-red-600">Erreur lors du chargement des clubs.</p>}

    return (
        <div className="relative flex flex-col items-center pb-20 bg-red-200 font-bold">

            <h1 className="mt-16 text-6xl">
            <span className="relative text-red-500 text-7xl">ISATI</span> c'est aussi <span className="text-red-500 text-7xl">{data.length}</span> clubs 
            </h1>
            <h2 className="mt-4 text-accent/80 text-xl">
            (cliquez sur l'icone pour rejoindre le groupe whatsapp associé)
            </h2>

            {/* Grille des clubs */}
            <div className="grid grid-cols-4 mt-5 gap-10">
                {data.map((club) => (
                    <div key={club.id} className={styleClub} onClick={() => setClubOpen(club)}>
                        <img 
                            src={pb.files.getURL(club, club.icon)} 
                            alt={club.name} 
                            className="w-auto h-64"
                        />
                        <span className="text-4xl text-center">{club.name}</span>
                    </div>  
                ))}
            </div>

            {/* Modale */}
            {clubOpen && (
                <div className="backdrop-blur-sm fixed inset-0 z-50 flex transition-all items-center justify-center bg-red-200/20">
                    
                    {/* Arrière-plan cliquable pour fermer */}
                    <div onClick={() => setClubOpen(undefined)} className="absolute inset-0 -z-10"></div>

                    {/* Bouton fermeture */}
                    <button onClick={() => setClubOpen(undefined)} className="absolute top-5 right-5 w-16 h-16 cursor-pointer hover:bg-slate-200/30">
                        X
                    </button>

                    {/* Contenu principal de la modale */}
                    <div className="flex flex-row gap-10">
                        <img 
                            src={pb.files.getURL(clubOpen, clubOpen.poster)} 
                            alt={clubOpen.name} 
                            className="w-auto h-128"
                        />

                        <div className="bg-red-300/50 p-2 rounded-lg">
                            <h1 className="text-4xl">{clubOpen.name}</h1>
                            <p>{clubOpen.description}</p>

                            <div className="mt-10 pt-8 border-t border-slate-100">
                                <a 
                                    href={clubOpen.discord} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full gap-3 bg-[#25D366] hover:bg-[#20b858] text-white py-2 px-2 rounded-lg font-bold text-xl transition-transform "
                                >
                                    <img 
                                        className="h-12 w-12" 
                                        src="https://upload.wikimedia.org/wikipedia/commons/1/19/WhatsApp_logo-color-vertical.svg" 
                                        alt="WhatsApp" 
                                    />
                                    Rejoindre le groupe WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            

        </div>
    )
}