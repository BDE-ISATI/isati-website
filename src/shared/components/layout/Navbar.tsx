import { Link } from "react-router";
import logoNoBG from "@/assets/logoNoBG.png";
import Button from "@/shared/components/ui/Button";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import useAuth from "@/features/auth/hooks/useAuth";

export default function Navbar() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();

  return (
    <nav className="flex h-16 items-center justify-between bg-accent px-6 text-accent-foreground">
      <Link to="/" className="flex items-center" aria-label="Accueil ISATI">
        <img src={logoNoBG} alt="ISATI" className="h-10 w-auto" />
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm">{user?.email}</span>
            <Button variant="secondary" onClick={logout}>
              Se déconnecter
            </Button>
          </>
        ) : (
          <ButtonLink to="/login" variant="secondary">
            Se connecter/S'inscrire
          </ButtonLink>
        )}      
      </div>
    </nav>
  );
}
