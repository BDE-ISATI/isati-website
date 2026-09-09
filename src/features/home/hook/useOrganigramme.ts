import { useState, useEffect } from "react";
import pb from "@/shared/lib/pocketbase";
import type { Member } from "@/features/home/homeTypes";

export default function useOrganigramme() {
    const [data, setData] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchOrganigramme() {
            setIsLoading(true);
            try {
                const records = await pb.collection("organigramme_member").getFullList<Member>({
                    sort: 'created',
                });
                if (isMounted) {
                    setData(records);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) setError(err as Error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        fetchOrganigramme();

        return () => {
            isMounted = false;
        };
    }, []); // Le tableau de dépendances est vide : la requête GET ne se fait qu'au montage.

    // Fonctions de mutation locale
    const addLocalMember = (newMember: Member) => {
        setData((prevData) => [...prevData, newMember]);
    };

    const updateLocalMember = (id: string, updatedMember: Member) => {
        setData((prevData) => prevData.map(member => member.id === id ? updatedMember : member));
    };

    const removeLocalMember = (id: string) => {
        setData((prevData) => prevData.filter(member => member.id !== id));
    };

    return { data, isLoading, error, addLocalMember, updateLocalMember, removeLocalMember };
}