import ButtonLink from "@/shared/components/ui/ButtonLink";
import Users from "@/assets/icons/users-round.svg?react";
import Wrench from "@/assets/icons/wrench.svg?react";
import User from "@/assets/icons/user-round.svg?react";
import Club from "@/assets/icons/sport-shoe.svg?react";

interface ProfileSidebarProps {
  foreign: boolean
}

export default function ProfileSidebar({ foreign }: ProfileSidebarProps) {
  
  return (
    <nav className="grid grid-cols-2 gap-2 md:flex md:flex-col">
      
      {!foreign ?
        <ButtonLink to="account" variant="sidebar" size="small">
        <User className="w-4 h-4" />
          Mon compte
        </ButtonLink> : null
      }
      
      
      <ButtonLink to="activities" variant="sidebar" size="small">
        <Users className="w-4 h-4" />
        {!foreign ? "Mes activités": "Activités"}
      </ButtonLink>
      <ButtonLink to="clubs" variant="sidebar" size="small">
        <Club className="w-4 h-4" />
        {!foreign ? "Mes clubs": "Clubs"}
      </ButtonLink>
      
      {!foreign ?
      <ButtonLink to="tools" variant="sidebar" size="small">
        <Wrench className="w-4 h-4" />
        {!foreign ? "Mes outils": "Outils"}
      </ButtonLink>: null
      }
    </nav>
  );
}
