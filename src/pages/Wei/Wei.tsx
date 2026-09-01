import { useEffect, type CSSProperties } from "react";
import useCurrentWei from "@/features/wei/hooks/queries/useCurrentWei";
import WeiEtape from "@/features/wei/components/WeiEtape";
import WeiBackground from "@/features/wei/components/WeiBackground";
import PageNav from "@/shared/components/layout/PageNav";
import LoadingOverlay from "@/shared/components/ui/LoadingOverlay";
import Error from "@/shared/components/ui/Error";
import { getFirstErrorMessage } from "@/shared/lib/pocketbase-errors";

export default function Wei() {

  useEffect(() => {
    document.title = 'Wei | ISATI';
  }, []);

  const current = useCurrentWei()

  const wei = current.data

  return (
    <div
      style={wei ? darkSurface : undefined}
      className="relative flex flex-1 flex-col"
    >
      {wei && <WeiBackground />}

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-4 text-foreground md:py-6">
        <PageNav />

        <Error message={getFirstErrorMessage(current.error)} className="justify-center" />

        {current.isPending && (
          <div className="relative min-h-64 flex-1">
            <LoadingOverlay />
          </div>
        )}

        {!current.isPending && !wei && (
          <p className="text-center text-sm text-muted-foreground">
            Aucun WEI n'a encore été publié.
          </p>
        )}

        {wei && (
          <>
            <header className="flex flex-col items-center gap-1 text-center">
              {wei.year && (
                <span className="text-6xl leading-none font-bold sm:text-8xl">{wei.year}</span>
              )}
              <h1 className="text-lg font-medium text-muted-foreground sm:text-xl">
                {wei.title || "WEI sans titre"}
              </h1>
              {wei.theme && (
                <p className="text-sm text-muted-foreground">
                  Thème : {wei.theme}
                </p>
              )}
            </header>

            <WeiEtape wei={wei} />
          </>
        )}
      </div>
    </div>
  );

}

//pour le flou noir 
const darkSurface = {
  "--color-foreground": "#ffffff",
  "--color-muted-foreground": "#ffffff",
  "--color-border": "rgba(255, 255, 255, 0.25)",
  "--color-muted": "rgba(255, 255, 255, 0.12)",
  "--color-background": "transparent",
} as CSSProperties;
