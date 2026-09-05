import { Link } from "react-router";
import Plus from "@/assets/icons/plus.svg?react";
import cn from "@/shared/utils/cn";

interface AddWeiCardProps {
  className?: string
}

export default function AddWeiCard({ className }: AddWeiCardProps) {
  return (
    <Link
      to="/wei/new"
      aria-label="Créer un WEI"
      className={cn(
        "flex min-h-24 w-full items-center justify-center rounded-md border-2 border-dashed border-accent bg-card text-accent shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-accent/5 hover:shadow-lg motion-reduce:transition-none",
        className
      )}
    >
      <Plus aria-hidden="true" className="h-10 w-10" />
    </Link>
  );
}
