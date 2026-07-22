import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react"
import cn from "@/shared/utils/cn";

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{
  children: ReactNode;
}

export { buttonVariants };

export default function Button({ children, className, variant, size, ...props } : ButtonsProps){
  return (
    <button className={cn(buttonVariants({variant, size, className}))} {...props} >
      {children}
    </button>
  ); 
}


const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-muted",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "bg-transparent text-foreground hover:bg-muted"
      },
      size: {
        small: "text-sm px-2 py-1",
        medium: "text-base px-3 py-1.5",
        large: "text-xl px-5 py-2.5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "medium"
    }
  }
)