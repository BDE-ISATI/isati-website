import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import Accueil from "@/assets/PageAccueil/Fond.jpg";
import Titre from "@/assets/PageAccueil/Titre.svg?react";

import StudentCount from "@/features/home/components/StudentCount";

import Musique from "@/assets/PageAccueil/Musique.svg?react"
import Esport from "@/assets/PageAccueil/Esport.svg?react"

import Muscu from "@/assets/PageAccueil/Muscu.svg?react"
import Sport from "@/assets/PageAccueil/Sport.svg?react"
import RollDraw from "@/assets/PageAccueil/RollDraw.svg?react"

import Carousel from "@/features/home/components/Carousel"

import Wei from "@/assets/PageAccueil/Wei.png"

import Organigramme from "@/assets/PageAccueil/organigramme.jpg"

import { clubs, featuredEvent, otherClubs, pastEventPosters, poles, stats } from "@/features/home/homeData";
import OrganigrammeSection from "@/features/home/components/OrganigrammeSection";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import OrganigrammeEdit from "@/features/home/components/OrganigrammeEdit";


function Home() {



  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

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

  {/* Prochain évènement */}

  <section id="a-la-une" className="relative overflow-hidden bg-accent px-6 py-6 text-accent-foreground lg:py-6">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center">
          <span className="pointer-events-none z-0 select-none text-[8vw] leading-[1] font-extrabold text-brand-300">
            Prochain
          </span>

          <img
            src={featuredEvent.poster}
            alt={`Affiche : ${featuredEvent.title}`}
            className="relative z-10 -my-[2vw] max-h-[50vh] w-auto max-w-full rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:z-30"
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

  <div className="relative flex flex-col items-center h-[600px] bg-red-200 font-bold">
    <h1 className="mt-16 text-6xl">
      <span className="relative text-red-500 text-7xl">ISATI</span> c'est aussi <span className="text-red-500 text-7xl">7</span> clubs pour <span className="text-red-500 text-7xl">450</span> étudiants
    </h1>
    <div className="w-[1000px] h-1 bg-black top-44 absolute"> </div>
      <div className="flex flex-row mt-16 gap-10">

        <div className="flex flex-col w-auto justify-center  items-center hover:bg-red-300">
          <Muscu className="w-auto h-64 text-white"/>
          <a className="text-4xl text-center">Muscu</a>
        </div>

        <div className="flex flex-col w-auto justify-center  items-center hover:bg-red-300">
          <Musique className="w-auto h-64 text-white"/>
          <a className="text-4xl text-center">Musique</a>
        </div>

        <div className="flex flex-col w-auto justify-center  items-center hover:bg-red-300">
          <RollDraw className="w-auto h-64 text-white"/>
          <a className="text-4xl text-center">Jeux de Société</a>
        </div>

        <div className="flex flex-col w-auto justify-center items-center hover:bg-red-300">
          <Sport className="w-auto h-64 text-white"/>
          <a className="text-4xl text-center">Sport</a>
        </div>

        <div className="flex flex-col w-auto justify-center items-center hover:bg-red-300">
          <Esport className="w-auto h-64 text-white"/>
          <a className="text-4xl text-center">Esport</a>
        </div>
      
      </div>
  
  </div>


 
    <StudentCount totalStudents={stats.students} />


    {/* Organigramme */}
    <OrganigrammeSection />
      



</div>

      </>
    )

}


export default Home;