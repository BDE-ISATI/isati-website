import { useEffect } from "react";

import Navbar from "@/shared/components/layout/Navbar";




function Home() {

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);
  

  return ( 
    <div>
      <Navbar />
    </div>
  )

}


export default Home;