import { useEffect } from "react";



import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

function Example() {
  return (
    <Popover className="relative">
      <PopoverButton>Solutions</PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col">
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
        <a href="/integrations">Integrations</a>
      </PopoverPanel>
    </Popover>
  )
}




function Home() {

  useEffect(() => {
    document.title = 'Accueil | ISATI';
  }, []);


  return (
    <>
      
    
    </>
  )

}


export default Home;