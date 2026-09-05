export const ASSOCIATION = {
  name: "ISATI",
  legalForm: "Association déclarée régie par la loi du 1er juillet 1901",
  addressLines: [
    "ESIR — Université de Rennes 1 — Campus de Beaulieu — Bât. 41 bis",
    "263 avenue du Général Leclerc — CS 74205",
    "35042 Rennes",
  ],
  rna: "W353000457",
  siret: "509 229 605 00019",
  presidentName: "Clément GUILLEMOT",
} as const;

export const CONTACT_EMAILS = {
  president: "president@isati.org",
  technique: "cto@isati.org",
} as const;

export const HOSTING = {
  host: {
    name: "OVH SAS",
    addressLines: ["2 rue Kellermann — 59100 Roubaix — France"],
    phone: "1007",
    datacenter: "Strasbourg (SBG), France",
  },
  storage: {
    name: "Amazon Web Services EMEA SARL",
    addressLines: [
      "38 avenue John F. Kennedy, L-1855 Luxembourg",
      "Succursale française : 31 place des Corolles, Tour Carpe Diem, 92400 Courbevoie",
    ],
    region: "eu-west-1 (Irlande)",
  },
} as const;

export const PRIVACY_LAST_UPDATED = "01/09/2026";
