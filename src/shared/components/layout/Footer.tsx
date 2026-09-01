import { NavLink } from "react-router";
import useWeiImmersive from "@/features/wei/hooks/useWeiImmersive";
import cn from "@/shared/utils/cn";

import Fur from "@/assets/fur.svg?react";

import Instagram from "@/assets/logos/socials/instagram.svg?react";
import Facebook from "@/assets/logos/socials/facebook.svg?react";
import Linkedin from "@/assets/logos/socials/linkedin.svg?react";
import Discord from "@/assets/logos/socials/discord.svg?react";
import Youtube from "@/assets/logos/socials/youtube.svg?react";
import Github from "@/assets/logos/socials/github.svg?react";

import Isati from "@/assets/logos/isati.svg?react";
import Esir from "@/assets/logos/esir.svg?react";
import UnivRennes from "@/assets/logos/univ-rennnes.svg?react";


export default function Footer() {

  const isTransparent = useWeiImmersive();

  return (
    <footer className="mt-auto">
      <Fur
        preserveAspectRatio="none"
        className={cn(
          "block h-12 w-full transition-colors duration-300 motion-reduce:transition-none sm:h-16",
          isTransparent ? "text-transparent" : "text-accent",
        )}
      />

      <div
        className={cn(
          "-mt-px text-accent-foreground transition-colors duration-300 motion-reduce:transition-none",
          isTransparent ? "bg-transparent" : "bg-accent",
        )}
      >
        <div className="mx-auto max-w-5xl px-6 py-10">

          <div className="mx-auto grid w-full max-w-md grid-cols-3 items-center justify-items-center gap-x-4 gap-y-10 sm:gap-x-8">

            <ul className="contents">
              <li>
                <a href="https://www.instagram.com/isatibde/" aria-label="Instagram" className="block rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                  <Instagram className="h-7 w-7" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/isati.lisatis" aria-label="Facebook" className="block rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                  <Facebook className="h-7 w-7" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/bde-isati/" aria-label="LinkedIn" className="block rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                  <Linkedin className="h-7 w-7" />
                </a>
              </li>
              <li>
                <a href="https://discord.gg/9HcWAxXEkR" aria-label="Discord" className="block rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                  <Discord className="h-7 w-7" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@isatibde" aria-label="YouTube" className="block rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                  <Youtube className="h-7 w-7" />
                </a>
              </li>
              <li>
                <a href="https://github.com/organizations/BDE-ISATI" aria-label="GitHub" className="block rounded-md transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                  <Github className="h-7 w-7" />
                </a>
              </li>
            </ul>

            <Isati className="h-10 w-auto max-w-full" />
            <Esir className="h-8 w-auto max-w-full" />
            <UnivRennes fill="currentColor" className="h-8 w-auto max-w-full" />

            <nav className="contents">
              <NavLink to="/contact" className="col-start-1 rounded-sm text-center text-sm underline-offset-4 transition-opacity  hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                Contact
              </NavLink>
              <NavLink to="/confidentialite" className="col-start-2 rounded-sm text-center text-sm underline-offset-4 transition-opacity  hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                Confidentialité
              </NavLink>
              <NavLink to="/mentions-legales" className="col-start-3 rounded-sm text-center text-sm underline-offset-4 transition-opacity  hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground">
                Mentions légales
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );

}
