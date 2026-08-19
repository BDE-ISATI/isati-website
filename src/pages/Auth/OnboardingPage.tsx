import { useEffect, useState } from "react";

import { Listbox } from '@headlessui/react'
import StyledListboxButton from "@/shared/components/ui/StyledListboxButton"
import StyledListboxOptions from "@/shared/components/ui/StyledListboxOptions"
import StyledListboxOption from "@/shared/components/ui/StyledListboxOption"
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Navigate } from "react-router";
import cn from "@/shared/utils/cn";
import Button from "@/shared/components/ui/Button";
import chevronDown from "@/assets/icons/chevron-down.svg"
import { years, levels, specialities } from "@/shared/constants/education";
import useOnboarding from "@/features/auth/hooks/useOnboarding";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import Error from "@/shared/components/ui/Error";

import Logo from "@/assets/logos/isati.svg?react";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";

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
    onBoard({level: selectedLevel, year: selectedYear, speciality: selectedSpeciality})
  }

  
  return (
    <>
      <div className="relative w-full max-w-sm">
        {/* Logo ISATI et texte*/}
        <Logo className="mb-8 h-16 w-auto text-accent"/>
        
        <div inert={loading} className={cn("transition duration-200",loading && "blur-sm pointer-events-none select-none",)}> 
        <h2 className="mb-6 text-2xl font-semibold">Finalisez votre compte ISATI</h2>
        
        {/* Listbox Niveau */}
        <label className="text-sm font-medium">
          Niveau
        </label>

        <Listbox value={selectedLevel} onChange={handleLevelChange}>
          <StyledListboxButton className="mb-4">
            <span className={cn(!selectedLevel && "text-muted-foreground")}>
              {selectedLevel?.name ?? "---"}
            </span>
            <img className="h-4 w-4 shrink-0" src={chevronDown} alt="" />
          </StyledListboxButton>
          <StyledListboxOptions>
            {levels.map((level) => (
              <StyledListboxOption key={level.key} value={level}>
                {level.name}
              </StyledListboxOption>
            ))}
          </StyledListboxOptions>
        </Listbox>
        
        
        {/* Listbox Année */}
        { (selectedLevel && selectedLevel.key === "ingenieur") ? <>
        <label className="text-sm font-medium">
          Année
        </label>

        <Listbox value={selectedYear} onChange={setSelectedYear}>
          <StyledListboxButton className="mb-4">
            <span className={cn(!selectedYear && "text-muted-foreground")}>
              {selectedYear?.name ?? "---"}
            </span>
            <img className="h-4 w-4 shrink-0" src={chevronDown} alt="" />
          </StyledListboxButton>
          <StyledListboxOptions>
            {years.map((year) => (
              <StyledListboxOption key={year.key} value={year}>
                {year.name}
              </StyledListboxOption>
            ))}
          </StyledListboxOptions>
        </Listbox></> : null }
        

        {/* Listbox Spécialité */}
        { (selectedYear && selectedLevel?.key === "ingenieur" ) ? <Listbox value={selectedSpeciality} onChange={setSelectedSpeciality}>
          <label className="text-sm font-medium">
            Spécialité
          </label>

          <StyledListboxButton className="mb-4">
            <span className={cn(!selectedSpeciality && "text-muted-foreground")}>
              {selectedSpeciality?.name ?? "---"}
            </span>
            <img className="h-4 w-4 shrink-0" src={chevronDown} alt="" />
          </StyledListboxButton>

          <StyledListboxOptions>
            {specialities.map((speciality) => (
              <StyledListboxOption key={speciality.key} value={speciality}>
                {speciality.name}
              </StyledListboxOption>
            ))}
          </StyledListboxOptions>

        </Listbox> : null}

        {/* Boutton SUBMIT */}
        <Button onClick={handleOnboarding} type="submit" disabled={!(selectedSpeciality || selectedLevel?.key === "preparatoire")} className="w-full">
          Finaliser
        </Button>

        <Error message={getFirstErrorMessage(error)} />
          
      </div>
      {loading && <LoadingOverlay />}

      </div>
    </>
  );
}

export default Onboarding;
