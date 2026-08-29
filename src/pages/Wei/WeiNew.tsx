import { useEffect } from "react";
import WeiForm from "@/features/wei/components/WeiForm";
import PageNav from "@/shared/components/layout/PageNav";

export default function WeiNew() {

  useEffect(() => {
    document.title = "Nouveau WEI | ISATI";
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 md:py-6">
      <PageNav />

      <h1 className="text-2xl font-semibold">Nouveau WEI</h1>
      <WeiForm />
    </div>
  );
}
