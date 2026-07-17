import { useAuthStore } from "@/features/auth/store/useAuthStore";

import { useEffect } from "react";

import VerificationBanner from '@/shared/components/layout/VerificationBanner';
import Navbar from "@/shared/components/layout/Navbar";



function Home() {

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const user = useAuthStore((s) => s.user)
  

  

  return ( 
    <div>
      <Navbar />
      <VerificationBanner />
    </div>
  )

}


export default Home;