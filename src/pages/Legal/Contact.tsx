import { useEffect } from "react";
import { NavLink } from "react-router";
import { ASSOCIATION, CONTACT_EMAILS } from "@/shared/constants/legal";

import Instagram from "@/assets/logos/socials/instagram.svg?react";
import Facebook from "@/assets/logos/socials/facebook.svg?react";
import Linkedin from "@/assets/logos/socials/linkedin.svg?react";
import Discord from "@/assets/logos/socials/discord.svg?react";
import Youtube from "@/assets/logos/socials/youtube.svg?react";
import Github from "@/assets/logos/socials/github.svg?react";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/isatibde/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/isati.lisatis", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bde-isati/", Icon: Linkedin },
  { label: "Discord", href: "https://discord.gg/9HcWAxXEkR", Icon: Discord },
  { label: "YouTube", href: "https://www.youtube.com/@isatibde", Icon: Youtube },
  { label: "GitHub", href: "https://github.com/organizations/BDE-ISATI", Icon: Github },
];

export default function Contact() {

  useEffect(() => {
    document.title = "Contact | ISATI";
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">

      <h1 className="text-xl font-semibold sm:text-2xl">Contact</h1>

      <section className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Questions générales et données personnelles</h2>
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-sm text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Écrivez à cette adresse pour toute question sur l'association et ses événements, pour
          exercer vos droits sur vos données personnelles, pour demander le retrait d'une
          photographie sur laquelle vous apparaissez, ou pour signaler un contenu illicite.
        </p>
      </section>

      <section className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Problème technique sur le site</h2>
          <a href={`mailto:${CONTACT_EMAILS.technique}`} className="text-sm text-link hover:underline">
            {CONTACT_EMAILS.technique}
          </a>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Bug, erreur d'affichage, problème de connexion ou d'envoi de preuve.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Adresse postale</h2>
        <address className="flex flex-col text-sm not-italic leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{ASSOCIATION.name}</span>
          {ASSOCIATION.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Réseaux sociaux</h2>
        <ul className="flex flex-row flex-wrap gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon className="h-6 w-6" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Voir aussi les{" "}
        <NavLink to="/mentions-legales" className="text-link hover:underline">
          mentions légales
        </NavLink>{" "}
        et la{" "}
        <NavLink to="/confidentialite" className="text-link hover:underline">
          politique de confidentialité
        </NavLink>.
      </p>

    </div>
  );
}
