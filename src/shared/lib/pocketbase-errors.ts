import type { ClientResponseError } from "pocketbase";

interface FieldErrorData {
  code?: string; 
  message?: string;
}

const ERROR_TABLE: Record<string, Record<string, string>> = {
  email: {
     validation_not_unique: "Cette adresse email est déjà utilisée.",
     validation_invalid_email: "Adresse email invalide."
   }
}

export function getFieldError(error: ClientResponseError | null, field: string) {
  const data: FieldErrorData | undefined = error?.response.data?.[field];
  if (!data) return null;
  const code = data.code;
  const response = code ? ERROR_TABLE[field]?.[code]: "Erreur inconnue"
  return response;
}
