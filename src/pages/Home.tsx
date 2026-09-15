import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import useMyParticipation from "@/features/wei/hooks/queries/useMyParticipation";
import weiPhase from "@/features/wei/libs/phase";
import { isWeiEligible, registrationOpen } from "@/features/wei/libs/registration";
import { ParticipationsStateOptions } from "@/shared/types/pocketbase-types";

import Accueil from "@/assets/PageAccueil/Fond.jpg";
import Titre from "@/assets/PageAccueil/Titre.svg?react";
import StudentCount from "@/features/home/components/StudentCount";
import Carousel from "@/features/home/components/Carousel"

import { clubs, featuredEvent, otherClubs, pastEventPosters, poles, stats } from "@/features/home/homeData";
import OrganigrammeSection from "@/features/home/components/OrganigrammeSection";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import OrganigrammeEdit from "@/features/home/components/OrganigrammeEdit";
import ListeClubs from "@/features/home/components/ListeClubs";
import Salles from "@/features/home/components/Salles";


function Home() {

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const user = useAuthStore((s) => s.user);
  const currentWei = useCurrentWei();
  const participation = useMyParticipation(currentWei.data?.id);

  const phase = weiPhase(currentWei.data ?? null);

  const eligible = isWeiEligible(user);

  const registered =
    !!participation.data && participation.data.state !== ParticipationsStateOptions.cancelled;

  const message = !phase?.isActive || !eligible
    ? null
    : phase.phase === "registration"
      ? registered
        ? "Inscription au WEI validée. Infos dans l'onglet WEI."
        : "Inscriptions au WEI ouvertes. Rendez-vous dans l'onglet WEI."
      : !registered && registrationOpen(currentWei.data ?? null)
        ? "Le parcours a commencé, tu peux encore t'inscrire. Rendez-vous dans l'onglet WEI."
        : "Le WEI a commencé. Défis et classement dans l'onglet WEI.";

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);
  

  if (isLoggedIn) {
    const user = useAuthStore((c) => c.user);
    
    if (!user) { return ;}
    const permission = useHasPermission(user.roles,"organigramme_member", "update")
    return (
      <>
          
        {permission.allowed && <OrganigrammeEdit/> }
      </>
    );
  }

  

  return (
      <>

<div className="w-full flex flex-col">

  {/* Page Accueil */}

  <div 
    style={{ backgroundImage: `url(${Accueil})` }}
    className="relative flex flex-col justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
  >
    <div className="absolute inset-0 backdrop-blur-[5px]"></div>  
    
    <Titre className="relative h-64 w-auto z-10 text-white"/>


  </div>

  {message && (
        <div
          role="status"
          className="w-full bg-warning px-4 py-2.5 text-center text-sm font-medium text-warning-foreground"
        >
          {message}
        </div>
  )}


  <div>
    <Salles />
  </div>

  {/* Prochain évènement */}

  <section id="a-la-une" className="relative overflow-hidden bg-accent px-6 py-6 text-accent-foreground lg:py-6">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center">
          <span className="pointer-events-none z-0 select-none text-[8vw] leading-[1] font-extrabold text-brand-300">
            Prochain
          </span>

          <img
            src={featuredEvent.poster}
            alt={`Affiche : ${featuredEvent.title}`}
            className="relative z-10 -my-[2vw] max-h-[50vh] w-auto max-w-full rounded-xl shadow-2xl transition-transform transition-shadow duration-300 hover:scale-115 hover:z-30"
          />

          <span className="pointer-events-none z-20 select-none text-[8vw] leading-[0.8] font-extrabold text-brand-900">
            Évènement
          </span>
        </div>

      </section>

  {/*Anciens évènements*/}

  <section id="evenements" className="bg-brand-800 px-6 py-16 text-brand-100 lg:py-24">
    <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
      <div className="lg:w-1/3">
        <h2 className="text-4xl font-bold sm:text-5xl xl:text-6xl">Les évènements précédents</h2>
        <p className="mt-2 text-4xl font-bold text-brand-400 sm:text-5xl xl:text-6xl">{stats.season}</p>
        <p className="mt-6 text-brand-200/80">
          Soirées à thème, afterworks, lundis isatiens, tournois, évènements sportifs et culturels : un aperçu de
          tout ce qui s'est passé cette année.
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <Carousel images={pastEventPosters} />
      </div>
    </div>
  </section>


  {/*Les clubs*/}

    <ListeClubs/>


 
    <StudentCount totalStudents={stats.students} />


    {/* Organigramme */}
    <OrganigrammeSection isEditing={false} />
      



</div>

      </>
    )

}


export default Home;