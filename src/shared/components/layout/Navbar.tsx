import { Link, useLocation } from "react-router";
import Button from "@/shared/components/ui/Button";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useAuth from "@/features/auth/hooks/useAuth";
import { CloseButton, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import pb from "@/shared/lib/pocketbase";

import UserIcon from "@/assets/icons/user-round.svg?react"
import LogoutIcon from "@/assets/icons/log-out.svg?react"
import Logo from "@/assets/logos/isati_notext.svg?react";




export default function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const isLandingPage = pathname === "/" && !isLoggedIn;

  return (
    <nav 
      className={`flex h-24 items-center justify-between px-6 z-50 ${
        isLandingPage 
          ? "absolute top-0 left-0 w-full bg-transparent text-white" 
          : "bg-accent text-accent-foreground"
      }`}
    >
      
      <Link to="/" className="flex items-center" aria-label="Accueil ISATI">
        <Logo className="h-16 w-auto text-white"/>
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn && user ? (
          <Popover className="relative">
            <PopoverButton className="group block cursor-pointer rounded-full outline-none">
              <img
                className="block h-14 w-14 rounded-full bg-accent-foreground object-cover ring-2 ring-transparent ring-offset-2 ring-offset-accent transition duration-200 group-hover:ring-white/50 group-focus-visible:ring-white/50 group-data-open:ring-white"
                src={pb.files.getURL(user, user.avatar, { thumb: "100x100" })}
                alt={`Photo de profil de ${user.username}`}
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full right-full z-50 mt-3 -mr-8 flex w-80 origin-top-right flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl ring-1 ring-black/5 transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              <div className="flex items-center gap-4 border-b border-border px-5 py-4">
                <img
                  className="h-14 w-14 shrink-0 rounded-full bg-muted object-cover"
                  src={pb.files.getURL(user, user.avatar, { thumb: "100x100" })}
                  alt=""
                />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">{user.username}</p>
                  <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1 p-3">
                <CloseButton as={ButtonLink} to={`/profile/${user.username}`} variant="ghost" size="menu">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  Mon profil
                </CloseButton>

                <Button variant="destructiveGhost" size="menu" onClick={logout}>
                  <LogoutIcon className="h-5 w-5" />
                  Se déconnecter
                </Button>
              </div>
            </PopoverPanel>
          </Popover>
        ) : (
          <ButtonLink to="/login" variant="secondary">
            Se connecter/S'inscrire
          </ButtonLink>
        )}

      </div>
    </nav>
  );
}
