import ButtonLink from "@/shared/components/ui/ButtonLink";
import { NavLink, Outlet} from "react-router";
import logoAuthPage from "@/assets/logos/isati_login_register.png"



function AuthLayout() {
  
  return (
    
    <div className="flex min-h-screen">
      <div className="relative flex w-full flex-col md:w-2/3">
        <header className="p-4">
          <ButtonLink to="/" variant="ghost" size="small">
            Accueil
          </ButtonLink>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 lg:px-16">
          <Outlet />
        </div>

        <nav className="flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 pb-4 text-xs text-muted-foreground">
          <NavLink to="/mentions-legales" className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Mentions légales
          </NavLink>
          <span aria-hidden="true">·</span>
          <NavLink to="/confidentialite" className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Confidentialité
          </NavLink>
          <span aria-hidden="true">·</span>
          <NavLink to="/contact" className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Contact
          </NavLink>
        </nav>
      </div>

      {/* Logo ISATI */}
      <div className="hidden md:block md:w-1/2">
        <img src={logoAuthPage} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default AuthLayout;
