import { useLocation } from "react-router";
import useHasPermission from "@/features/roles/hooks/useHasPermission";
import ButtonLink from "@/shared/components/ui/ButtonLink";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import cn from "@/shared/utils/cn";

interface PageNavProps {
  back?: string
  backLabel?: string
  className?: string
}

export default function PageNav({ back, backLabel, className }: PageNavProps) {

  const location = useLocation();
  const canViewPanel = useHasPermission("view", "wei_panel");
  const showPanel = canViewPanel && !location.pathname.startsWith("/wei/panel");

  if (!back && !showPanel) return null;

  return (
    <div className={cn("flex flex-row items-center justify-between gap-3", className)}>
      {back ? (
        <ButtonLink to={back} variant="ghost" size="small">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {backLabel ?? "Retour"}
        </ButtonLink>
      ) : (
        <span />
      )}

      {showPanel && (
        <ButtonLink to="/wei/panel" variant="ghost" size="small">
          Panel WEI
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      )}
    </div>
  );
}
