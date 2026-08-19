import { Link, useNavigate } from "react-router";
import logoNoBG from "@/assets/logoNoBG.png";
import Button from "@/shared/components/ui/Button";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useAuth from "@/features/auth/hooks/useAuth";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { NavLink } from "react-router";
import pb from "@/shared/lib/pocketbase";

export default function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    navigate("/")
  }

  return (
    <nav className="flex h-16 items-center justify-between bg-accent px-6 text-accent-foreground">
      
      <Link to="/" className="flex items-center" aria-label="Accueil ISATI">
        <img src={logoNoBG} alt="ISATI" className="h-10 w-auto" />
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn && user ? 
          <>
            <span className="text-sm">{user.email}</span>


          <Popover className="relative">
            <PopoverButton className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <img className="h-10 w-10 rounded-full bg-accent-foreground" src={pb.files.getURL(user, user.avatar, { thumb: "50x50" })} alt="?" />
            </PopoverButton>

            <PopoverPanel
              anchor="bottom end"
              className="gap-1 mt-4 flex w-48 flex-col rounded-md bg-white p-1 shadow-md [--anchor-gap:0.25rem] [--anchor-padding:1rem]"
            >
              <NavLink to={`/profile/${user.username}` } className="rounded-md px-3 py-2 text-sm hover:bg-neutral-100">
                Mon profile
              </NavLink>

              <Button className="rounded-md px-3 py-2 text-sm" onClick={handleLogout}>
                Se déconnecter
              </Button>

              
            </PopoverPanel>
          </Popover>
        </>
        : (
          <ButtonLink to="/login" variant="secondary">
            Se connecter/S'inscrire
          </ButtonLink>
        )}

      </div>
    </nav>
  );
}
