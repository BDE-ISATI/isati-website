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
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-border active:bg-border/70",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        ghost: "bg-transparent text-foreground hover:bg-muted active:bg-border",
        sidebar: "w-full justify-start gap-2 border border-border bg-card text-card-foreground hover:bg-muted hover:text-accent active:bg-border aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground aria-[current=page]:border-accent"
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