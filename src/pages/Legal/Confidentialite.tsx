import { useEffect } from "react";
import { NavLink } from "react-router";
import { ASSOCIATION, CONTACT_EMAILS, HOSTING, PRIVACY_LAST_UPDATED } from "@/shared/constants/legal";

const PURPOSES = [
  ["Compte utilisateur", "Authentification, accès au service", "Exécution du service demandé"],
  ["Inscription à l'événement", "Organisation, constitution des équipes", "Exécution du service demandé"],
  ["Dépôt et validation des preuves", "Déroulement du jeu, classement", "Exécution du service demandé"],
  ["Publication d'une preuve", "Affichage public du contenu", "Consentement explicite"],
  ["Archivage d'une preuve", "Conservation dans les archives des éditions passées", "Consentement explicite"],
  ["Journaux de connexion", "Sécurité, prévention des abus", "Intérêt légitime"],
  ["Sanctions", "Modération, respect du règlement", "Intérêt légitime"],
  ["Traçabilité des décisions", "Savoir qui a validé, refusé ou sanctionné, et permettre un recours", "Intérêt légitime"],
] as const;

const RETENTION = [
  ["Compte non vérifié", "Supprimé 24 heures après sa création"],
  ["Compte utilisateur", "Jusqu'à demande de suppression, puis désactivation et retrait des données d'identification"],
  ["Preuves non archivées", "Fichiers supprimés une semaine après la fin de l'événement"],
  ["Preuves archivées", "Conservées sans limite, retrait possible sur demande"],
  ["Résultats et classements", "Conservés sans limite, détachés de toute donnée d'identification"],
  ["Journaux de connexion", "12 mois"],
  ["Sauvegardes", "7 jours de rétention glissante"],
  ["Sanctions", "Jusqu'à leur date d'expiration, puis 12 mois"],
] as const;

export default function Confidentialite() {

  useEffect(() => {
    document.title = "Confidentialité | ISATI";
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 md:gap-6 md:py-6">

      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold sm:text-2xl">Politique de confidentialité</h1>
        <p className="text-sm text-muted-foreground">Dernière mise à jour : {PRIVACY_LAST_UPDATED}</p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">1. Responsable du traitement</h2>
        <address className="flex flex-col text-sm not-italic leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">{ASSOCIATION.name}</span>
          <span>{ASSOCIATION.legalForm}</span>
          {ASSOCIATION.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <span>Représentée par {ASSOCIATION.presidentName}, président.</span>
        </address>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Contact pour toute question relative aux données personnelles :{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>{" "}
          (contact technique :{" "}
          <a href={`mailto:${CONTACT_EMAILS.technique}`} className="text-link hover:underline">
            {CONTACT_EMAILS.technique}
          </a>
          ).
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">2. Données collectées</h2>

        <h3 className="text-base font-medium">Conditions d'accès</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          L'inscription requiert une adresse électronique universitaire valide. Le service n'est pas
          accessible aux personnes de moins de 15 ans.
        </p>

        <h3 className="text-base font-medium">Lors de la création du compte</h3>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground marker:text-border">
          <li>adresse électronique universitaire</li>
          <li>mot de passe (stocké sous forme chiffrée, jamais en clair)</li>
          <li>pseudonyme</li>
          <li>photo de profil (facultative)</li>
          <li>niveau, année d'études et spécialité</li>
          <li>
            type de compte, qui indique <code className="rounded-sm bg-muted px-1 py-0.5 text-xs">deleted</code>{" "}
            lorsque le compte a fait l'objet d'une demande de suppression
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          L'adresse électronique n'est <strong className="font-medium text-foreground">pas visible</strong>{" "}
          par les autres utilisateurs. Ce réglage est modifiable par l'utilisateur depuis son compte.
        </p>

        <h3 className="text-base font-medium">Lors de l'utilisation du service</h3>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground marker:text-border">
          <li>inscription à un événement et affectation à une équipe</li>
          <li>contenus déposés : textes, photographies et vidéos servant de preuve</li>
          <li>points obtenus et historique de validation</li>
          <li>éventuelles sanctions prononcées par les responsables de l'association</li>
        </ul>

        <h3 className="text-base font-medium">Concernant les membres habilités de l'association</h3>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground marker:text-border">
          <li>identité du membre ayant validé ou refusé un contenu</li>
          <li>identité du membre ayant prononcé une mesure de modération</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Ces informations permettent de savoir qui a pris quelle décision, à des fins de traçabilité
          et de recours.
        </p>

        <h3 className="text-base font-medium">Automatiquement</h3>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground marker:text-border">
          <li>adresse IP et journaux de connexion, à des fins de sécurité</li>
          <li>empreinte technique des appareils utilisés pour se connecter</li>
          <li>
            date de création, de dernière modification du compte, et date du dernier changement de
            pseudonyme
          </li>
          <li>habilitations attribuées au sein de l'association</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">3. Finalités et bases légales</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-lg border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-2 pr-4 font-medium">Traitement</th>
                <th scope="col" className="py-2 pr-4 font-medium">Finalité</th>
                <th scope="col" className="py-2 font-medium">Base légale</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {PURPOSES.map(([traitement, finalite, base]) => (
                <tr key={traitement} className="border-b border-border last:border-b-0">
                  <td className="py-2 pr-4 align-top">{traitement}</td>
                  <td className="py-2 pr-4 align-top">{finalite}</td>
                  <td className="py-2 align-top">{base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Au moment du dépôt d'une preuve, deux choix distincts et{" "}
          <strong className="font-medium text-foreground">désactivés par défaut</strong> sont
          proposés : rendre la preuve publique, c'est-à-dire visible par les autres utilisateurs du site, et
          l'archiver, c'est-à-dire la conserver après la fin de l'événement. Ces choix sont
          indépendants l'un de l'autre et révocables à tout moment.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">4. Droit à l'image</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les photographies et vidéos déposées peuvent représenter des personnes identifiables. En
          rendant un contenu public, l'utilisateur déclare avoir recueilli l'accord des personnes qui
          y figurent.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Toute personne apparaissant sur une photographie publiée peut en demander le retrait à{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>
          . Le retrait est effectué sans délai et sans avoir à être motivé, y compris pour une
          photographie archivée d'une édition passée, et y compris si la personne n'a pas de compte
          sur le site.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Le choix d'archiver un contenu est{" "}
          <strong className="font-medium text-foreground">définitif quant à sa conservation</strong> :
          une preuve archivée est conservée après la fin de l'événement et après la suppression du
          compte de son auteur. Cette conséquence est rappelée au moment du dépôt.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">5. Destinataires</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les données ne sont ni vendues, ni transmises à des tiers à des fins commerciales. Y ont
          accès :
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-muted-foreground marker:text-border">
          <li>
            les membres de l'association habilités, dans la stricte limite de leurs fonctions
            (organisation de l'événement, validation des preuves, modération)
          </li>
          <li>l'hébergeur, en sa qualité de prestataire technique</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les données sont hébergées par {HOSTING.host.name}, dans son datacenter de{" "}
          {HOSTING.host.datacenter}.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les sauvegardes sont conservées par {HOSTING.storage.name}, société de droit
          luxembourgeois, dans la région {HOSTING.storage.region}. Ce prestataire agit en qualité de
          sous-traitant, dans le cadre d'un accord de traitement des données.
        </p>
        <p className="text-sm leading-relaxed text-foreground">
          <strong className="font-medium">
            Aucune donnée n'est transférée en dehors de l'Union européenne.
          </strong>
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">6. Durées de conservation</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-md border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-2 pr-4 font-medium">Donnée</th>
                <th scope="col" className="py-2 font-medium">Durée</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {RETENTION.map(([donnee, duree]) => (
                <tr key={donnee} className="border-b border-border last:border-b-0">
                  <td className="py-2 pr-4 align-top">{donnee}</td>
                  <td className="py-2 align-top">{duree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">6 bis. Décisions de modération</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les responsables de l'association peuvent restreindre l'accès d'un utilisateur au service
          en cas de manquement au règlement. Ces décisions sont prises par une personne, jamais de
          façon automatisée : aucun traitement automatisé produisant des effets juridiques n'est mis
          en œuvre.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          L'utilisateur concerné est informé de la mesure et de son motif, et peut la contester à{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">7. Droits des personnes</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Conformément au Règlement général sur la protection des données, chacun dispose d'un droit
          d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité
          concernant ses données.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Ces droits s'exercent par courrier électronique à{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>
          , en justifiant de son identité. Une réponse est apportée dans un délai d'un mois.
        </p>

        <h3 className="text-base font-medium">Modalités de suppression du compte</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          À la demande de l'utilisateur, le compte est désactivé et les données permettant de
          l'identifier en sont retirées : l'adresse électronique et le pseudonyme sont remplacés par
          des valeurs techniques dépourvues de signification, la photo de profil est supprimée, les
          habilitations sont retirées et le mot de passe est remplacé par une valeur aléatoire. La
          connexion au compte devient définitivement impossible et celui-ci n'est plus rattachable à
          une personne par les autres utilisateurs.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Le niveau, l'année d'études et la spécialité sont conservés, détachés de toute donnée
          d'identification, à des fins statistiques. Les résultats obtenus (points, classements) sont
          conservés sous cette même forme, afin de ne pas altérer les classements des éditions
          passées.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Ce traitement constitue une pseudonymisation : les enregistrements conservés restent soumis
          au présent document et aux droits énoncés ci-dessus. Une demande d'effacement complet peut
          être adressée à{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>.
        </p>

        <h3 className="text-base font-medium">Contenus déposés</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les fichiers des preuves non archivées (case « archiver » non cochée) sont supprimés une
          semaine après la fin de l'événement. Les preuves archivées sont conservées après la
          suppression du compte, afin de préserver la mémoire de l'édition ; elles ne sont alors plus
          rattachées à un compte identifiable.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Toute personne figurant sur une photographie archivée peut en demander le retrait à{" "}
          <a href={`mailto:${CONTACT_EMAILS.president}`} className="text-link hover:underline">
            {CONTACT_EMAILS.president}
          </a>
          , sans avoir à motiver sa demande, y compris après la suppression de son compte et y
          compris si elle n'a jamais eu de compte sur le site.
        </p>

        <h3 className="text-base font-medium">Sauvegardes</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les données peuvent subsister dans les sauvegardes pendant une durée maximale de 7 jours,
          jusqu'à leur rotation. Aucune restauration ne rétablit un compte ayant fait l'objet d'une
          demande de suppression.
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          En cas de désaccord persistant, une réclamation peut être adressée à la Commission
          nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715,
          75334 Paris Cedex 07 —{" "}
          <a href="https://www.cnil.fr" className="text-link hover:underline">
            www.cnil.fr
          </a>
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">8. Sécurité</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les mots de passe sont stockés sous forme chiffrée. Les échanges entre le navigateur et le
          serveur sont protégés par le protocole HTTPS. L'accès aux données d'administration est
          restreint aux membres habilités.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">9. Cookies et traceurs</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Le site dépose dans le navigateur uniquement les données strictement nécessaires à son
          fonctionnement : un jeton d'authentification permettant de maintenir la session ouverte. Ce
          dépôt ne requiert pas de consentement préalable. Aucun outil de mesure d'audience ni
          service tiers de suivi n'est utilisé.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">10. Modifications</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          La présente politique peut être modifiée. Les utilisateurs sont informés de toute
          modification substantielle par un message lors de leur connexion.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Voir également les{" "}
          <NavLink to="/mentions-legales" className="text-link hover:underline">
            mentions légales
          </NavLink>{" "}
          du site.
        </p>
      </section>

    </div>
  );
}
