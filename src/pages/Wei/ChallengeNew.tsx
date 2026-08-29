import { useEffect } from "react";
import ChallengeForm from "@/features/wei/components/ChallengeForm";
import PageNav from "@/shared/components/layout/PageNav";

export default function ChallengeNew() {

  useEffect(() => {
    document.title = "Nouveau défi | ISATI";
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 md:py-6">
      <PageNav />

      <h1 className="text-2xl font-semibold">Nouveau défi</h1>
      <ChallengeForm />
    </div>
  );
}
