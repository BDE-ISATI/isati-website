import { useState } from "react";

import pb from "@/shared/lib/pocketbase";

import useOrganigramme from "../hook/useOrganigramme";
import AjouterMembre from "@/assets/PageAccueil/ajouterMembre.svg?react"
import { OrganigrammeMemberPoleOptions } from "@/shared/types/pocketbase-types";


import type { Member } from "@/features/home/homeTypes"

export default function OrganigrammeSection({isEditing}: {isEditing : boolean}) {
    const { data = [], isLoading, error, addLocalMember, updateLocalMember, removeLocalMember } = useOrganigramme();

    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedPole, setSelectedPole] = useState("");
    const [editingMember, setEditingMember] = useState<Member | null>(null);

    const POCKETBASE_URL = import.meta.env.VITE_PB_URL;
    const COLLECTION_NAME = "organigramme_member";

    

    if (isLoading) return <div className="text-center text-brand-200 font-bold py-10">Chargement...</div>;
    if (error) return <div className="text-center text-red-500 font-bold py-10">Erreur lors du chargement.</div>;

    const poles = Object.values(OrganigrammeMemberPoleOptions);

    function handleOpenEditMember(member: Member) {
        if (!isEditing) return;
        setEditingMember(member);
    }

    // Suppression
async function handleDeleteClick(memberId: string) {
    if (window.confirm("Voulez-vous vraiment supprimer ce membre ?")) {
        try {
            await pb.collection('organigramme_member').delete(memberId);
            setEditingMember(null);
            removeLocalMember(memberId); // Retire l'élément de l'interface immédiatement
        } catch (error) {
            console.error("Erreur de suppression :", error);
        }
    }
}

// Modification
async function handleSubmitEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const avatarFile = formData.get('avatar') as File;
    if (avatarFile && avatarFile.size === 0) {
        formData.delete('avatar');
    }
    
    try {
        if (editingMember) {
            // PocketBase renvoie l'objet mis à jour
            const updatedRecord = await pb.collection(COLLECTION_NAME).update<Member>(editingMember.id, formData);
            setEditingMember(null);
            updateLocalMember(editingMember.id, updatedRecord); // Remplace l'élément dans l'interface
        }
    } catch (error) {
        console.error("Erreur lors de la modification :", error);
    }
}

// Ajout
async function handleSubmitAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('pole', selectedPole);
    
    try {
        // PocketBase renvoie le nouvel objet avec son ID et sa date de création
        const newRecord = await pb.collection(COLLECTION_NAME).create<Member>(formData);
        setIsAddModalOpen(false);
        addLocalMember(newRecord); // Ajoute l'élément à l'interface
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
    }
}

    return (
        <section id="equipe" className="bg-accent-second px-6 py-16 text-accent-foreground lg:py-24">
            <div className="mx-auto px-20">       
                <h2 className="text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
                <span className="text-brand-200">{data.length}</span> d'entre eux font vivre{" "}
                <span className="text-brand-200">l'association</span> toute l'année
                </h2>

                <p className="mx-auto mt-6 max-w-3xl text-center text-white/85">
                Élus chaque année parmi le cycle préparatoire et le cycle ingénieur, les responsables de l'ISATI se
                répartissent en pôles pour organiser la vie étudiante de l'école.
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
                                        onClick={() => handleOpenEditMember(member)}
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
                                {isEditing && (
                                <div 
                                    className="flex flex-col items-center group w-32 cursor-pointer" 
                                    onClick={() => {
                                    setSelectedPole(pole);
                                    setIsAddModalOpen(true);
                                }}
                                >
                                    <div className="overflow-hidden rounded-full w-24 h-24 mb-3 border-2 border-transparent group-hover:border-brand-300 transition-colors duration-300 shadow-md">
                                        <AjouterMembre className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                    </div>
                                    <span className="text-white font-bold text-center leading-tight text-sm">
                                        nouveau
                                    </span>
                                    <span className="text-brand-300 text-xs text-center mt-1 font-medium uppercase tracking-wide">
                                        A ajouter
                                    </span>
                                </div>)}
                            </div>
                        </div>
                    ))}
                    {editingMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-accent p-8 rounded-lg shadow-2xl max-w-md w-full border border-brand-200/20">
                    <h3 className="text-2xl font-bold text-white mb-6">Modifier {editingMember.name}</h3>
                    
                    <form onSubmit={handleSubmitEdit} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-brand-200 mb-1 text-sm font-semibold">Nom</label>
                            <input type="text" name="name" defaultValue={editingMember.name} required className="w-full p-2 rounded bg-accent-second text-white border border-brand-200/30" />
                        </div>
                        
                        <div>
                            <label className="block text-brand-200 mb-1 text-sm font-semibold">Rôle</label>
                            <input type="text" name="role" defaultValue={editingMember.role} required className="w-full p-2 rounded bg-accent-second text-white border border-brand-200/30" />
                        </div>
                        
                        <div>
                            <label className="block text-brand-200 mb-2 text-sm font-semibold">Nouvelle Image (Optionnel)</label>
                            
                            {editingMember.avatar && (
                                <img 
                                    src={`${POCKETBASE_URL}/api/files/${COLLECTION_NAME}/${editingMember.id}/${editingMember.avatar}`} 
                                    alt={`Avatar de ${editingMember.name}`} 
                                    className="w-20 h-20 object-cover rounded-full mb-3 border border-brand-200/30 shadow-sm"
                                />
                            )}
                            
                            <input type="file" name="avatar" accept="image/*" className="w-full p-2 rounded text-white" />
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                            <button 
                                type="button" 
                                onClick={() => handleDeleteClick(editingMember.id)} 
                                className="p-2 text-white cursor-pointer hover:bg-red-500/10 rounded transition-colors"
                                title="Supprimer ce membre"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>

                            <div className="flex gap-4">
                                <button type="button" onClick={() => setEditingMember(null)} className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500 font-semibold">
                                    Annuler
                                </button>
                                <button type="submit" className="px-4 py-2 text-accent font-bold bg-brand-200 rounded hover:bg-brand-300">
                                    Mettre à jour
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )}
         {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-accent p-8 rounded-lg shadow-2xl max-w-md w-full border border-brand-200/20">
                    <h3 className="text-2xl font-bold text-white mb-6">Ajouter au pôle {selectedPole}</h3>
                    
                    <form onSubmit={handleSubmitAdd} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-brand-200 mb-1 text-sm font-semibold">Nom</label>
                            <input type="text" name="name" required className="w-full p-2 rounded bg-accent-second text-white border border-brand-200/30" />
                        </div>
                        
                        <div>
                            <label className="block text-brand-200 mb-1 text-sm font-semibold">Rôle</label>
                            <input type="text" name="role" required className="w-full p-2 rounded bg-accent-second text-white border border-brand-200/30" />
                        </div>
                        
                        <div>
                            <label className="block text-brand-200 mb-1 text-sm font-semibold">Image</label>
                            <input type="file" name="avatar" accept="image/*" required className="w-full p-2 rounded text-white" />
                        </div>
                        
                        <div className="flex justify-end gap-4 mt-2">
                            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-500 font-semibold">
                                Annuler
                            </button>
                            <button type="submit" className="px-4 py-2 text-accent font-bold bg-brand-200 rounded hover:bg-brand-300">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
            </div>
         </div>
      </section>
    );
}