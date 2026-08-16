import { useEffect, useState } from "react";

import { Listbox,  ListboxOption, ListboxOptions } from '@headlessui/react'
import StyledListboxButton from "@/shared/components/ui/StyledListboxButton"
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Navigate } from "react-router";
import cn from "@/shared/utils/cn";
import Button from "@/shared/components/ui/Button";
import chevronDown from "@/assets/icons/chevron-down.svg"
import logoISATINoBGRed from "@/assets/logoISATINoBGRed.svg";
import { years, levels, specialities } from "@/shared/constants/education";
import useOnboarding from "@/features/auth/hooks/useOnboarding";
import IsatiAnimation from "@/shared/components/animations/IsatiAnimation";

function Onboarding() {
  
  useEffect(() => {
    document.title = "Onboarding | ISATI";
  }, []);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user)
  const { onBoard, error, loading } = useOnboarding()

  const [ selectedLevel, setSelectedLevel ] = useState<(typeof levels)[number] | null>(null)
  const [ selectedYear, setSelectedYear ] = useState<(typeof years)[number] | null>(null)
  const [ selectedSpeciality, setSelectedSpeciality ] = useState<(typeof specialities)[number] | null>(null)

  if (!isLoggedIn) return <Navigate to="/" replace/>;
  if (user?.level) return <Navigate to="/" replace/>;

  function handleLevelChange(data: (typeof levels)[number] | null) {
    setSelectedLevel(data)
    if (data?.key === "preparatoire") {
      setSelectedYear(null)
      setSelectedSpeciality(null)
    }
  }

  function handleOnboarding() {
    console.log(selectedLevel,selectedSpeciality,selectedYear)
    onBoard({level: selectedLevel, year: selectedYear, speciality: selectedSpeciality})
  }

  
  return (
    <>
      <div className="w-full max-w-sm">
        {/* Logo ISATI et texte*/}
        <img src={logoISATINoBGRed} alt="ISATI" className="mb-8 h-16 w-auto"/>
        
        <div inert={loading} className={cn("transition duration-200",loading && "blur-sm pointer-events-none select-none",)}> 
        <h2 className="mb-6 text-2xl font-semibold">Finalisez votre compte ISATI</h2>
        
        {/* Listbox Niveau */}
        <label className="text-sm font-medium">
          Niveau
        </label>

        <Listbox value={selectedLevel} onChange={handleLevelChange}>
          <StyledListboxButton variant="normal" size="medium" className="mb-4">
            <span className={cn(!selectedLevel && "text-muted-foreground")}>
              {selectedLevel?.name ?? "---"}
            </span>

            <span className="flex size-2 shrink-0 justify-around items-center">
              <img className="absolute mr-5" src={chevronDown} />
            </span>

          </StyledListboxButton>
          <ListboxOptions anchor="bottom" className="w-(--button-width) mt-1 rounded-md border border-input bg-background p-1 shadow-md focus:outline-none [--anchor-gap:0.25rem]">
            {levels.map((level) => (
              <ListboxOption key={level.key} value={level} className="cursor-pointer rounded-md px-3 py-2 text-base text-foreground data-focus:bg-muted data-selected:font-medium">
                {level.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
        
        
        {/* Listbox Année */}
        { (selectedLevel && selectedLevel.key === "ingenieur") ? <>
        <label className="text-sm font-medium">
          Année
        </label>

        <Listbox value={selectedYear} onChange={setSelectedYear}>
          <StyledListboxButton variant="normal" size="medium" className="mb-4">
            <span className={cn(!selectedYear && "text-muted-foreground")}>
              {selectedYear?.name ?? "---"}
            </span>
            <span className="flex size-2 justify-around items-center">
              <img className="absolute mr-5" src={chevronDown} />
            </span>
          </StyledListboxButton>
          <ListboxOptions anchor="bottom" className="w-(--button-width) mt-1 rounded-md border border-input bg-background p-1 shadow-md focus:outline-none [--anchor-gap:0.25rem]">
            {years.map((year) => (
              <ListboxOption key={year.key} value={year} className="cursor-pointer rounded-md px-3 py-2 text-base text-foreground data-focus:bg-muted data-selected:font-medium">
                {year.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox></> : null }
        

        {/* Listbox Spécialité */}
        { (selectedYear && selectedLevel?.key === "ingenieur" ) ? <Listbox value={selectedSpeciality} onChange={setSelectedSpeciality}>
          <label className="text-sm font-medium">
            Spécialité
          </label>

          <StyledListboxButton variant="normal" size="medium" className="mb-4">
            <span className={cn(!selectedSpeciality && "text-muted-foreground")}>
              {selectedSpeciality?.name ?? "---"}
            </span>
            <span className="flex size-2 justify-around items-center">
              <img className="absolute mr-5" src={chevronDown} />
            </span>
          </StyledListboxButton>

          <ListboxOptions anchor="bottom" className="w-(--button-width) mt-1 rounded-md border border-input bg-background p-1 shadow-md focus:outline-none [--anchor-gap:0.25rem]" >
            {specialities.map((speciality) => (
              <ListboxOption key={speciality.key} value={speciality} className="cursor-pointer rounded-md px-3 py-2 text-base text-foreground data-focus:bg-muted data-selected:font-medium" >
                {speciality.name}
              </ListboxOption>
            ))}
          </ListboxOptions>

        </Listbox> : null}

        {/* Boutton SUBMIT */}
        <Button onClick={handleOnboarding} type="submit" disabled={!(selectedSpeciality || selectedLevel?.key === "preparatoire")} className="w-full">
          Finaliser
        </Button>

        {error ? 
        <p className="rounded-md border border-status-critical bg-status-critical/10 px-3 py-2 text-sm text-status-critical">     
          Une erreur est survenue. Veuillez réessayer. {error.message}
        </p>: null}
      </div>
      {loading && (
        <div className="absolute inset-0 grid place-items-center">
          <IsatiAnimation style={{ width: 320, height: 180 }} />
        </div>
      )}

      </div>
    </>
  );
}

export default Onboarding;
