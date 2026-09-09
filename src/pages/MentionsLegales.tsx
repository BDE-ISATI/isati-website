export default function MentionsLegales() {
  const block = "flex flex-col bg-accent p-6 md:p-8 rounded-sm gap-4 text-white/85 text-sm";
  const styleh2 = "text-center text-2xl md:text-3xl text-brand-200 font-bold mb-2";
  const styleh3 = "text-lg font-semibold text-white mt-2";

  return (
    <div className="max-w-4xl mx-auto px-6 my-16 flex flex-col gap-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
        Mentions <span className="text-brand-200">légales</span>
      </h1>

      {/* Éditeur */}
      <div className={block}>
        <h2 className={styleh2}>Éditeur du site</h2>
        <ul className="space-y-2">
          <li>
            <strong className="text-white">Identité :</strong> ISATI — Association des élèves de l'ESIR (Association loi 1901)
          </li>
          <li>
            <strong className="text-white">Siège social :</strong> ESIR — Université de Rennes, 263 avenue Général Leclerc, CS 74205, Bâtiment 41bis, 35042 Rennes Cedex
          </li>
          <li>
            <strong className="text-white">Contact :</strong> 02 23 23 66 08 /{" "}
            <a href="mailto:esir-contact@listes.univ-rennes.fr" className="text-brand-200 underline">
              esir-contact@listes.univ-rennes.fr
            </a>
          </li>
          <li>
            <strong className="text-white">Directeur de la publication :</strong> Timothé Daniel
          </li>
        </ul>
      </div>

      {/* Hébergement */}
      <div className={block}>
        <h2 className={styleh2}>Hébergement</h2>
        <ul className="space-y-2">
          <li>
            <strong className="text-white">Nom de l'hébergeur :</strong> OVH SAS
          </li>
          <li>
            <strong className="text-white">Adresse :</strong> 2, rue Kellermann — 59100 Roubaix — France
          </li>
          <li>
            <strong className="text-white">Contact :</strong> +33 9 72 10 10 07 / 1007
          </li>
          <li>
            <strong className="text-white">Site web :</strong>{" "}
            <a href="https://www.ovhcloud.com" target="_blank" rel="noreferrer" className="text-brand-200 underline">
              www.ovhcloud.com
            </a>
          </li>
        </ul>
      </div>

      {/* RGPD */}
      <div className={block}>
        <h2 className={styleh2}>RGPD</h2>

        <div>
          <h3 className={styleh3}>Responsable du traitement</h3>
          <p>L'association ISATI est responsable du traitement des données à caractère personnel collectées sur ce site.</p>
        </div>

        <div>
          <h3 className={styleh3}>Données collectées et finalités</h3>
          <p>
            <strong className="text-white">Authentification et gestion de compte :</strong> L'adresse e-mail universitaire est collectée pour vérifier l'appartenance à l'école et créer un compte étudiant.
          </p>
          <p className="mt-1">
            <strong className="text-white">Animation de la vie étudiante (WEI) :</strong> Les photographies et enregistrements vidéo téléversés servent à la validation des défis organisés par l'association.
          </p>
        </div>

        <div>
          <h3 className={styleh3}>Base légale du traitement</h3>
          <p>Le traitement repose sur le consentement de l'utilisateur (article 6.1.a du RGPD), recueilli lors de l'inscription et lors de chaque envoi de contenu multimédia.</p>
        </div>

        <div>
          <h3 className={styleh3}>Caractère obligatoire du recueil</h3>
          <p>L'adresse e-mail institutionnelle est obligatoire pour créer un compte et accéder aux fonctionnalités membres. La consultation des pages publiques reste libre et ne requiert aucune transmission de données personnelles.</p>
        </div>

        <div>
          <h3 className={styleh3}>Sécurité et confidentialité</h3>
          <p>Les mots de passe sont hachés de manière sécurisée en base de données et ne transitent ni ne s'affichent jamais en clair sur le site ou pour les administrateurs.</p>
        </div>

        <div>
          <h3 className={styleh3}>Destinataires des données</h3>
          <p>Les administrateurs du site et organisateurs de l'ISATI ont accès aux adresses e-mail et aux éléments multimédias déposés pour la modération. Lorsqu'un utilisateur soumet une preuve média, il peut expressément autoriser sa diffusion auprès de l'ensemble des membres connectés.</p>
        </div>

        <div>
          <h3 className={styleh3}>Durée de conservation</h3>
          <p>Les médias liés aux défis sont conservés pendant 30 jours avant suppression automatique, sauf si l'auteur choisit délibérément d'archiver le contenu.</p>
          <p className="mt-1">Les données de compte sont conservées pendant toute la durée de la scolarité de l'étudiant ou jusqu'à la suppression du compte.</p>
        </div>

        <div>
          <h3 className={styleh3}>Droits des utilisateurs</h3>
          <p>Conformément au RGPD et à la loi « Informatique et Libertés », chaque étudiant dispose :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>D'un droit d'accès, de rectification et d'effacement de ses données personnelles.</li>
            <li>De la possibilité de supprimer son compte à tout moment directement depuis la page de profil.</li>
            <li>D'un droit de réclamation auprès de la CNIL (cnil.fr) s'il estime que ses droits ne sont pas respectés.</li>
          </ul>
          <p className="mt-2">
            Pour toute demande relative aux contenus archivés ou pour faire valoir ces droits, le contact s'effectue par e-mail à :{" "}
            <a href="mailto:esir-contact@listes.univ-rennes.fr" className="text-brand-200 underline">
              esir-contact@listes.univ-rennes.fr
            </a>
          </p>
        </div>
      </div>

      {/* Propriété intellectuelle */}
      <div className={block}>
        <h2 className={styleh2}>Propriété intellectuelle et droit à l'image</h2>
        <div>
          <h3 className={styleh3}>Contenus du site</h3>
          <p>La structure générale, les textes, graphismes et icônes sont la propriété exclusive de l'association ISATI ou de l'ESIR. Toute reproduction, représentation ou diffusion sans autorisation préalable est interdite.</p>
        </div>
        <div>
          <h3 className={styleh3}>Médias étudiants et droit à l'image</h3>
          <p>Les photos et vidéos soumises restent protégées par le droit d'auteur et le droit à l'image des personnes concernées. Aucune exploitation ou rediffusion hors du cadre associatif de l'école ne peut être effectuée sans l'accord écrit de l'association et des personnes identifiables à l'image.</p>
        </div>
      </div>
    </div>
  );
}