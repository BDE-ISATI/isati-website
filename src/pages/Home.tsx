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

function Example() {
  return (
    <Popover className="relative">
      <PopoverButton>Solutions</PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col">
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
        <a href="/integrations">Integrations</a>
      </PopoverPanel>
    </Popover>
  )
}




function Home() {



  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const imageIds = Array.from({ length: 21 }, (_, index) => index + 1);
  const imageIdImportantes = Array.from({ length: 5 }, (_, index) => index + 1);

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);

  

  if (isLoggedIn) {
    return (
      <>
        <h1>
          Vous êtes connecté
        </h1>
      </>
    );
  }


  return (
      <>
        {/* Conteneur global de la page */}
<div className="w-full flex flex-col">

  {/* SECTION 1 : Accueil */}
  <div 
    style={{ backgroundImage: `url(${Accueil})` }}
    className="relative flex flex-col justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
  >
    <div className="absolute inset-0 backdrop-blur-[5px]"></div>
    
    {/* Titre (Ajustement du z-index pour rester au-dessus du blur) */}
    <Titre className="relative h-64 w-auto z-10 text-black"/>


  </div>

  {/* SECTION 2 : Évènement */}
  <div className="relative flex flex-col justify-center items-center w-full h-auto pt-42 pb-10 z-20 bg-red-600">
    
    {/* Conteneur d'empilement (Z-index) */}
    <div className="relative flex flex-col justify-center items-center">
      
      {/* Texte Arrière-plan / Au-dessus */}
      <span className="absolute -top-48 z-0 text-[300px] font-bold text-red-200 leading-none pointer-events-none">
        Prochain
      </span>
      
      {/* Image Centrale */}
      <img className="relative z-10 h-130 w-auto hover:scale-120 transition-all duration-200 hover:z-30 cursor-pointer" src={Wei} alt="Wei" />
      
      {/* Texte Premier-plan / En-dessous */}
      <span className="absolute -bottom-24 z-20 text-[300px] font-bold text-black leading-none pointer-events-none">
        Évènement
      </span>

    </div>
    
  </div>

  <div className="bg-red-800 flex flex-row justify-center items-center gap-10 px-36 pt-18 pb-12 text-red-200">
    <div className="flex flex-col w-full gap-10">
      <h1 className="text-center w-full text-8xl font-bold">Les évènements précédents</h1>
      <h1 className="text-center text-red-300 w-full text-8xl font-bold">2025-2026</h1>
    </div>
    
    <Carousel/>
  </div>


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


 {/* Organigramme */}
    <div className="relative flex flex-col items-center pb-16 bg-red-600 font-bold">
      <h1 className="mt-16 text-6xl">
        <span className="relative text-red-200 text-7xl">54</span> d'entre eux participent <span className="relative text-red-200 text-7xl">activement</span>  à la vie étudiante
      </h1>

    <div className="mt-15 flex flex-row gap-10">
      <div className="flex flex-col gap-10">
        <div className=" rounded-lg border-white p-2 max-w-[680px]">
          <h1 className="text-7xl font-bold bg-red-200 text-red-600">Communication</h1>
          <div className="mt-2 grid grid-cols-2 gap-2">
            

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            

            
            
          </div>
        </div>

        <div className=" rounded-lg border-white p-2 max-w-[680px]">
          <h1 className="text-7xl font-bold bg-red-200 text-red-600">Sport & Culture</h1>
          <div className="mt-2 grid grid-cols-2 gap-2">
            

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            

            
            
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-10">
        <div className="rounded-lg border-white p-2 max-w-[680px]">
          <h1 className="text-7xl font-bold bg-red-200 text-red-600">Restreint</h1>
          <div className="mt-2 grid grid-cols-2 gap-2">
            

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            

            
            
          </div>
        </div>

        <div className="rounded-lg border-white p-2 max-w-[680px]">
          <h1 className="text-7xl font-bold bg-red-200 text-red-600">Événements</h1>
          <div className="mt-2 grid grid-cols-2 gap-2">
            

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>
            

            
            
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-10">
        <div className=" rounded-lg border-white p-2 max-w-[680px]">
          <h1 className="text-7xl font-bold bg-red-200 text-red-600">Formation</h1>
          <div className="mt-2 grid grid-cols-2 gap-2">
            

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            

            
            
          </div>
        </div>

        <div className="rounded-lg border-white p-2 max-w-[680px]">
          <h1 className="text-7xl font-bold bg-red-200 text-red-600">Santé</h1>
          <div className="mt-2 grid grid-cols-2 gap-2">
            

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>

            <div className="relative flex items-center h-24 last:odd:col-span-2 last:odd:mx-auto">
              <img className="z-20 absolute w-24 h-24 border-2 border-white rounded-full" src={Organigramme} alt="" />
              <div className="relative border-2 h-16 ml-12 rounded-lg bg-red-200 border-white">
                <h1 className="ml-12 pr-2 text-[20px] text-red-600">Respo Pampleme</h1>
                  <h1 className="ml-12 pr-2 text-red-950">Harmonie PAILETTE</h1>
              </div>
            </div>


            

            
            
          </div>
        </div>

      </div>


      
    </div>

    </div>


</div>

      </>
    )

}


export default Home;