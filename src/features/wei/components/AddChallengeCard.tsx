import { Link } from "react-router";
import Plus from "@/assets/icons/plus.svg?react";
import cn from "@/shared/utils/cn";

interface AddChallengeCardProps {
  className?: string
}

export default function AddChallengeCard({ className }: AddChallengeCardProps) {
  return (
    <Link
      to="/wei/challenge/new"
      aria-label="Créer un défi"
      className={cn(
        "flex h-full min-h-52 items-center justify-center rounded-md border-2 border-dashed border-accent bg-card text-accent shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-accent/5 hover:shadow-lg motion-reduce:transition-none",
        className
      )}
    >
      <Plus aria-hidden="true" className="h-12 w-12" />
    </Link>
  );
}
