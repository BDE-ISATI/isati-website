import { type VariantProps } from "class-variance-authority";
import cn from "@/shared/utils/cn";
import { buttonVariants } from "@/shared/components/ui/Button";
import type { ReactNode } from "react"
import { NavLink, type NavLinkProps } from "react-router";

interface ButtonsProps extends NavLinkProps, VariantProps<typeof buttonVariants>{
  children: ReactNode;
}

export default function ButtonLink({ children, className, variant, size, ...props } : ButtonsProps){
  return (
    <NavLink className={cn(buttonVariants({variant, size, className}))} {...props}>
      {children}
    </NavLink>
  ); 
}