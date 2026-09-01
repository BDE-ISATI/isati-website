import { useEffect } from "react";
import { ASSOCIATION, CONTACT_EMAILS, HOSTING } from "@/shared/constants/legal";

export default function MentionsLegales() {

  useEffect(() => {
    document.title = "Mentions légales | ISATI";
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 md:py-6">

      <h1 className="text-2xl font-semibold">Mentions légales</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Éditeur du site</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Le présent site est édité par :
        </p>
        <address className="flex flex-col text-sm not-italic leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{ASSOCIATION.name}</span>
          <span>{ASSOCIATION.legalForm}</span>
          <span>Siège social :</span>
          {ASSOCIATION.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span>Numéro RNA : {ASSOCIATION.rna}</span>
          <span>SIRET : {ASSOCIATION.siret}</span>
          <span>
            Adresse électronique :{" "}
            <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
              {CONTACT_EMAILS.president}
            </a>
          </span>
          <span>
            Contact technique :{" "}
            <a href={`mailto:${CONTACT_EMAILS.technique}`} className="text-link hover:underline">
              {CONTACT_EMAILS.technique}
            </a>
          </span>
        </address>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Directeur de la publication</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {ASSOCIATION.presidentName}, en qualité de président de l'association {ASSOCIATION.name}.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Hébergement</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Le site est hébergé par :
        </p>
        <address className="flex flex-col text-sm not-italic leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{HOSTING.host.name}</span>
          {HOSTING.host.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span>Téléphone : {HOSTING.host.phone}</span>
        </address>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Stockage des données</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les sauvegardes des données du site sont conservées par :
        </p>
        <address className="flex flex-col text-sm not-italic leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{HOSTING.storage.name}</span>
          {HOSTING.storage.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les sauvegardes sont conservées dans la région {HOSTING.storage.region}.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Propriété intellectuelle</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          L'ensemble des éléments du site (structure, textes, logos, images, éléments graphiques) est
          la propriété de {ASSOCIATION.name} ou fait l'objet d'une autorisation d'utilisation, sauf
          mention contraire.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation
          écrite préalable est interdite.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les contenus publiés par les utilisateurs (textes, photographies, vidéos) restent la
          propriété de leurs auteurs. En les déposant sur le site, l'utilisateur concède à{" "}
          {ASSOCIATION.name} une licence gratuite et non exclusive pour les afficher dans le cadre du
          service.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Lorsque l'utilisateur choisit d'archiver un contenu, cette licence est consentie{" "}
          <strong className="font-medium text-foreground">sans limitation de durée</strong> pour son
          archivage et son affichage dans les archives des éditions passées, y compris après la
          suppression de son compte.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          L'utilisateur, comme toute personne figurant sur un contenu, conserve la faculté d'en
          demander le retrait à{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Signalement d'un contenu illicite</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Tout contenu manifestement illicite peut être signalé à{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>
          . {ASSOCIATION.name} s'engage à en accuser réception et à agir promptement.
        </p>
      </section>

    </div>
  );
}
