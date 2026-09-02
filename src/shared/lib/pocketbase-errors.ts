import type { ClientResponseError } from "pocketbase";

type ValueType = {
  code: string,
  message: string
}

const ERROR_TABLE: Record<string, Record<string, string>> = {
  email: {
     validation_not_unique: "Cette adresse email est déjà utilisée.",
     validation_invalid_email: "Adresse email invalide.",
     validation_required: "Ce champ est requis.",
     email_not_verified: "Veuillez vérifier votre email avant de vous connecter.",
   },
  oldPassword: {
     validation_invalid_old_password: "Mot de passe actuel incorrect.",
     validation_required: "Ce champ est requis."
   },
  password: {
     validation_min_text_constraint: "4 caractères minimum.",
     validation_max_text_constraint: "71 caractères maximum.",
     validation_required: "Ce champ est requis.",
     invalid_password: "Mot de passe incorrect.",
   },

  passwordConfirm: {
    validation_values_mismatch: "Les mots de passe ne correspondent pas.",
    validation_required: "Ce champ est requis.",
  },
  username: {
    validation_not_unique: "Nom d'utilisateur est déjà utilisé.",
    validation_invalid_username: "Nom d'utilisateur invalide.",
    validation_required: "Ce champ est requis.",
    insufficient_permissions: "Vous n'avez pas le droit de modifier ce pseudo.",
  },
  account: {
    insufficient_permissions: "Vous n'avez pas le droit d'effectuer cette action.",
    not_authenticated: "Vous devez être connecté pour effectuer cette action.",
    account_deleted: "Ce compte n'existe plus.",
    email_not_verified: "Veuillez vérifier votre adresse e-mail",
    account_suspended: "Vous n'avez plus le droit d'intéragire avec votre compte.",
    not_registered: "Vous devez être inscrit au WEI pour accéder à cette page."
  },
  id: {
    user_not_found: "Utilisateur introuvable.",
  },
  avatar: {
    insufficient_permissions: "Vous n'avez pas le droit de modifier cet avatar."
  },
  locations: {
    insufficient_permissions: "Vous n'avez pas le droit d'effectuer cette action.",
  },
  challenges: {
    insufficient_permissions: "Vous n'avez pas le droit d'effectuer cette action.",
  },
  challenge_categories: {
    insufficient_permissions: "Vous n'avez pas le droit d'effectuer cette action.",
  },
  weis: {
    insufficient_permissions: "Vous n'avez pas le droit d'effectuer cette action.",
    wei_not_found: "Le wei selectionné n'éxiste pas.",
    registrations_closed: "Les inscriptions au wei sont fermés."
  },
  wei: {
    registrations_closed: "Les inscriptions au WEI ne sont pas ouvertes.",
    already_registered: "Vous êtes déjà inscrit à ce WEI.",
  },
  participations: {
    insufficient_permissions: "Vous n'avez pas le droit de vous inscrire à ce WEI.",
    validation_not_unique: "Vous êtes déjà inscrit à ce WEI.",
    validation_required: "Ce champ est requis.",
  },
  validations: {
    insufficient_permissions: "Vous n'avez pas le droit d'effectuer cette action.",
    already_submitted: "Vous avez déjà envoyé une preuve pour ce défi.",
    challenge_closed: "Ce défi n'est pas ouvert aux demandes de validation.",
    challenge_not_found: "Ce défi n'existe plus.",
    not_assigned: "Vous devez être inscrit au WEI et affecté à une équipe.",
    leader_cannot_submit: "Les chefs d'équipe ne peuvent pas envoyer de preuve.",
    own_validation: "Vous ne pouvez pas valider votre propre preuve.",
  },
  teams: {
    insufficient_permissions: "Vous n'avez pas le droit de gérer les équipes.",
    team_not_found: "Cette équipe n'existe plus.",
    team_not_empty: "Cette équipe compte encore des membres.",
    already_in_team: "Cette personne appartient déjà à une autre équipe.",
    member_not_found: "Cette personne ne fait pas partie de cette équipe.",
    validation_not_unique: "Une équipe porte déjà ce nom pour ce WEI.",
    validation_required: "Ce champ est requis.",
  },
  factions: {
    insufficient_permissions: "Vous n'avez pas le droit de gérer les factions.",
    faction_not_found: "Cette faction n'existe plus.",
    faction_has_teams: "Cette faction contient encore des équipes. Retirez-les de la faction ou supprimez-les.",
    validation_not_unique: "Une faction porte déjà ce nom pour ce WEI.",
    validation_required: "Ce champ est requis.",
  },
  faction: {
    faction_not_found: "Cette faction n'existe plus.",
  },
  role: {
    invalid_role: "Rôle invalide.",
  },
  status: {
    invalid_status: "Statut de validation invalide.",
  },
  reason: {
    validation_required: "Un motif est requis pour refuser cette preuve.",
  },
  points_awarded: {
    invalid_points: "Le nombre de points attribués est invalide.",
    insufficient_permissions: "Vous n'avez pas le droit de modifier les points de cette preuve.",
  },
  challenge: {
    validation_required: "Ce champ est requis.",
    challenge_closed: "Ce défi n'est pas ouvert aux demandes de validation.",
  },
  proof_file: {
    validation_required: "Une preuve est requise.",
    validation_file_size_limit: "Ce fichier est trop lourd.",
    validation_invalid_mime_type: "Ce type de fichier n'est pas accepté pour ce défi.",
    invalid_proof_type: "Ce type de preuve n'est pas accepté pour ce défi.",
    too_many_files: "Vous avez joint trop de fichiers pour ce défi.",
  },
  proof_text: {
    validation_required: "Ce champ est requis.",
    validation_is_url: "Lien invalide.",
    invalid_proof_type: "Ce défi n'accepte pas de preuve sous forme de lien.",
  },
}

export function getFirstErrorMessage(error: ClientResponseError | null): string | undefined {
  if (!error) return undefined;

  const data = getData(error)
  if (!data) return error.message;

  for (const field of Object.keys(data)) {
    const fieldError = data[field];
    if (!fieldError) continue;

    const translated = ERROR_TABLE[field]?.[fieldError.code] ?? fieldError.message;
    return translated;
  }

  return error.message;
}

export function getFieldError(error: ClientResponseError | null, field: string) {
  if (!error) return
  const fieldError = getData(error)?.[field] 
  if (!fieldError) return
  return ERROR_TABLE[field]?.[fieldError.code] ?? fieldError.message;
}

export function getRawFieldError(error: ClientResponseError | null, field: string): string | undefined {
  if (!error) return;
  const fieldError = getData(error)?.[field];
  if (!fieldError) return;
  return fieldError.message;
}

export function hasErrorCode(error: ClientResponseError | null, code: string): boolean {
  if (!error) return false
  
  const data = getData(error)
  if (!data) return false 

  return Object.values(data).some((value) => {
    return value.code === code
  })
}


function getData(error: ClientResponseError | null) {
  return error?.response?.data as Record<string, ValueType> | undefined
}