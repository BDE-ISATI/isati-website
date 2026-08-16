import { useMutation } from "@tanstack/react-query";
import pb from "@/shared/lib/pocketbase";
import { useAuthStore } from "../store/useAuthStore";
import { years, levels, specialities } from "@/shared/constants/education";
import { useNavigate } from 'react-router'; 

export default function useOnboarding() {

  const user = useAuthStore((s) => s.user)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const navigate = useNavigate()

  const onboardingMutation = useMutation({
    mutationFn: async (data: {level: typeof levels[number] | null, year: typeof years[number] | null, speciality: typeof specialities[number] | null}) => {
      const updateData = {
        speciality: data.speciality?.key,
        school_year: data.year?.key,
        level: data.level?.key,
      }
      if (!isLoggedIn) throw Error("Vous devez être connecté")
      if (!user) throw Error("Aucun utilisateur de connecté")
      if (!updateData.level) throw Error("Veuillez selectionner un niveau")
      return await pb.collection('users').update(user.id, updateData)
    },

    onSuccess: () => {
      navigate("/")
    }
  })

  return  { onBoard: onboardingMutation.mutate, error: onboardingMutation.error, loading: onboardingMutation.isPending }



}