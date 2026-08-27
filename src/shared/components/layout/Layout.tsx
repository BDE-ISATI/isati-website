import { Outlet } from "react-router";

import Navbar from "@/shared/components/layout/Navbar";
import Footer from "@/shared/components/layout/Footer";

export default function Layout() {

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />

      <main className="flex min-h-[calc(95dvh-6rem)] flex-1 flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );

}
