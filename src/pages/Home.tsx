import { useEffect } from "react";

import VerificationBanner from '@/shared/components/layout/VerificationBanner';
import Navbar from "@/shared/components/layout/Navbar";



function Home() {

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);
  

  

  return ( 
    <div>
      <VerificationBanner />
      <Navbar />
      
    </div>
  )

}


export default Home;