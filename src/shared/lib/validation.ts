// Adresse universitaire 
export const PROD_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(etudiant\.univ-rennes1?\.fr|univ-rennes1?\.fr)$/;

// Adresse test
export const TEST_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@proton\.me$/i;


export function isAllowedEmail(email: string): boolean {
  if (PROD_EMAIL_REGEX.test(email)) return true;
  if (import.meta.env.VITE_ALLOW_TEST_EMAILS === "true" && TEST_EMAIL_REGEX.test(email)) return true;
  return false;
}
