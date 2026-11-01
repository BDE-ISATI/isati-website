import Wei from "@/assets/PageAccueil/Wei.png";

import type { FeaturedEvent } from "@/features/home/homeTypes";

export const stats = {
  students: 450,
  season: "2025-2026",
};

export const featuredEvent: FeaturedEvent = {
  label: "Prochain évènement",
  title: "Week-end d'intégration",
  description:
    "Le rendez-vous de la rentrée : deux jours pour accueillir les nouveaux élèves-ingénieurs, mélanger les promos et lancer l'année tous ensemble.",
  poster: Wei,
  link: "https://www.instagram.com/isatibde/",
};

export const pastEventPosters = Array.from(
  { length: 21 },
  (_, index) => `/Affiches/Autres/${index + 1}.png`,
);
