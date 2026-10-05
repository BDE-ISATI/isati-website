import { useState } from "react";

import pb from "@/shared/lib/pocketbase";

import useOrganigramme from "../hook/useOrganigramme";
import AjouterMembre from "@/assets/PageAccueil/ajouterMembre.svg?react"
import { OrganigrammeMemberPoleOptions } from "@/shared/types/pocketbase-types";


import type { Member } from "@/features/home/homeTypes"

export default function OrganigrammeSection() {
    const { data = [], isPending, error } = useOrganigramme();

    const poles = Object.values(OrganigrammeMemberPoleOptions);
    
    if (isPending) return <div> <h1>L'organigramme est en cours de chargement</h1> </div>; 
    if (error) return <div> <h1>Oulala, gros soucis, pas d'organigramme dispo pour le moment</h1> </div>;

    return (
        <section id="equipe" className="bg-accent-second px-6 py-16 text-accent-foreground lg:py-24">
            <div className="mx-auto px-20">       
                <h2 className="text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
                <span className="text-brand-200">{data.length}</span> d'entre eux font vivre{" "}
                <span className="text-brand-200">l'association</span> toute l'année
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-center text-white/85">
                Chacun son pole, son role et ses responsabilités mais ensemble ils permettent de proposer une grande diversité d'activité au sein de l'ESIR
                </p>
                
                <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-8 w-full p-4 space-y-8">
                    {poles.map(pole => (
                        <div 
                            key={pole} 
                            className="bg-accent-third backdrop-blur-sm rounded-sm flex flex-col items-center overflow-hidden"
                        >
                            <h3 className="bg-accent text-4xl font-extrabold text-red-200 uppercase tracking-wider py-4 w-full text-center">
                                {pole}
                            </h3>
                            
                            <div className="flex flex-wrap justify-center gap-8 w-full p-6">
                                {data.filter(row => row.pole === pole).map((member, index) => (
                                    <div 
                                        key={member.id ?? index} 
                                        className="flex flex-col items-center group w-32 cursor-pointer"
                                    >
                                        <div className="overflow-hidden rounded-full w-24 h-24 mb-1 border-2 border-transparent group-hover:border-brand-300 transition-colors duration-300">
                                            <img 
                                                src={pb.files.getURL(member, member.avatar)} 
                                                alt={`Avatar de ${member.name}`} 
                                                className="w-full h-full object-cover transition-transform duration-300" 
                                            />
                                        </div>
                                        <span className="text-white font-bold text-center leading-tight text-sm">
                                            {member.name}
                                        </span>
                                        <span className="text-brand-300 text-xs text-center mt-1 uppercase">
                                            {member.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
         </div>
      </section>
    );
}