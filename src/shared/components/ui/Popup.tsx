import React from 'react';


interface PopupsProps {
  trigger: boolean;
  children: React.ReactNode;
}



export default function Popup({trigger, children}: PopupsProps) {
  return (trigger) ? (

    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-dvh bg-black/20"> 
      <div className="relative p-8 w-full max-w-screen-sm bg-white">

          {children}

      </div>
    </div>


  ) : ""

}