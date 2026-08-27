import useTeams from "@/features/wei/hooks/queries/useTeams";
import useWeis from "@/features/wei/hooks/queries/useWeis";
import { useEffect, useState } from "react";

function Home() {

  useEffect(() => {
    document.title = 'Wei | ISATI';
  }, []);


  const [ weiId, setWeiId ] = useState<string>()

  const wei = useWeis()
  const teams = useTeams(weiId)

  if (wei.data && !weiId) {
    setWeiId(wei.data?.[0]?.id)
  }

  return (
    <>
      <p> {wei.data?.toString()} </p>
    
    </>
  )

}


export default Home;