import useOrganigramme from "../hook/useOrganigramme";

export default function OrganigrammeSection() {
    const { data = [], isLoading, error } = useOrganigramme();

    const POCKETBASE_URL = import.meta.env.VITE_PB_URL;
    const COLLECTION_NAME = "organigramme_member";

    

    if (isLoading) return <div className="text-center text-brand-200 font-bold py-10">Chargement...</div>;
    if (error) return <div className="text-center text-red-500 font-bold py-10">Erreur lors du chargement.</div>;

    const poles = [...new Set(data.map(row => row.pole))];

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
                                    >
                                        <div className="overflow-hidden rounded-full w-24 h-24 mb-1 border-2 border-transparent group-hover:border-brand-300 transition-colors duration-300">
                                            <img 
                                                src={`${POCKETBASE_URL}/api/files/${COLLECTION_NAME}/${member.id}/${member.avatar}`} 
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