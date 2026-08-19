import ButtonLink from "@/shared/components/ui/ButtonLink";
import { Outlet} from "react-router";
import logoAuthPage from "@/assets/isati_logo/isati_login_register.png"



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
      </div>

      {/* Logo ISATI */}
      <div className="hidden md:block md:w-1/2">
        <img src={logoAuthPage} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default AuthLayout;
