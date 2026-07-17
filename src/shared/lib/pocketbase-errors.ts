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












/** Renvoie le message FR de l'erreur d'un champ précis, ou null s'il n'y en a pas. */
// export function getFieldError(error: ClientResponseError | null, field: string): string | null {
//   const data = error?.response?.data?.[field] as FieldErrorData | undefined;
//   if (!data) return null;
//   const specific = data.code ? FIELD_ERROR_MESSAGES[field]?.[data.code] : undefined;
//   return specific ?? translateErrorCode(data.code, data.message);
// }
