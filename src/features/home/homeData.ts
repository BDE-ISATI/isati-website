import Wei from "@/assets/PageAccueil/Wei.png";

import Sport from "@/assets/PageAccueil/Sport.svg?react";
import Muscu from "@/assets/PageAccueil/Muscu.svg?react";
import Musique from "@/assets/PageAccueil/Musique.svg?react";
import RollDraw from "@/assets/PageAccueil/RollDraw.svg?react";
import Esport from "@/assets/PageAccueil/Esport.svg?react";
import BookOpen from "@/assets/icons/book-open.svg?react";
import UsersRound from "@/assets/icons/users-round.svg?react";

import type { Club, FeaturedEvent, Pole, Member } from "@/features/home/homeTypes";

export const stats = {
  students: 450,
  clubs: 7,
  actifs: 54,
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

export const clubs: Club[] = [
  {
    name: "Sport",
    description: "Foot, hand, volley, basket : quatre équipes en compétition universitaire, et des créneaux ouverts à tous.",
    Icon: Sport,
  },
  {
    name: "Muscu",
    description: "Des séances de renfo et de muscu entre esiriens, du débutant au confirmé.",
    Icon: Muscu,
  },
  {
    name: "Musique",
    description: "Un local, des instruments et tous ceux qui veulent jouer ensemble.",
    Icon: Musique,
  },
  {
    name: "Roll&Draw",
    description: "Des projets imaginés et réalisés par les étudiants : applis, jeux vidéo et jeux de société.",
    Icon: RollDraw,
  },
  {
    name: "ESIR Esport",
    description: "Tournois, entraînements et équipes compétitives sur vos jeux préférés.",
    Icon: Esport,
  },
  {
    name: "Shiro Kitsune",
    description: "Partez à la découverte de la culture et de la langue japonaise.",
    Icon: BookOpen,
  },
  {
    name: "Kulture",
    description: "Les cultures du monde à l'honneur, portées par les étudiants de l'école.",
    Icon: UsersRound,
  },
];

export const otherClubs = ["LECAT", "Club Conférences", "Danse", "Jeux", "Prévention"];



export const poles: Pole[] = [
  {
    id: "bureau",
    title: "Bureau Restreint",
    members: [
      { id: "1", name: "Alexandre Dupont", role: "Président", avatarUrl: "/avatars/alex.jpg" },
      { id: "2", name: "Camille Martin", role: "Vice-Présidente", avatarUrl: "" },
      { id: "3", name: "Lucas Bernard", role: "Trésorier", avatarUrl: "/avatars/lucas.jpg" },
      { id: "4", name: "Emma Petit", role: "Secrétaire Générale", avatarUrl: "/avatars/emma.jpg" },
    ],
  },
  {
    id: "event",
    title: "Pôle Événements",
    members: [
      { id: "5", name: "Hugo Blanc", role: "Respo Événements", avatarUrl: "/avatars/hugo.jpg" },
      { id: "6", name: "Inès Garnier", role: "Logistique Soirées", avatarUrl: "" },
      { id: "7", name: "Julien Faure", role: "Logistique Afterworks", avatarUrl: "" },
      { id: "8", name: "Kenza Benali", role: "Sécurité & Prévention", avatarUrl: "" },
      { id: "9", name: "Manon Girard", role: "Planning", avatarUrl: "" },
    ],
  },
  {
    id: "com",
    title: "Pôle Communication",
    members: [
      { id: "10", name: "Nicolas Chevalier", role: "Respo Com & Design", avatarUrl: "" },
      { id: "11", name: "Océane Marchand", role: "Gestion Réseaux", avatarUrl: "" },
      { id: "12", name: "Pierre Simon", role: "Photographe / Vidéaste", avatarUrl: "" },
      { id: "13", name: "Quentin Michel", role: "Graphisme & Affiches", avatarUrl: "" },
    ],
  },
  {
    id: "partenariat",
    title: "Pôle Partenariats & Sponsoring",
    members: [
      { id: "14", name: "Roxane Colin", role: "Respo Partenariats", avatarUrl: "" },
      { id: "15", name: "Sébastien Vidal", role: "Relations Entreprises", avatarUrl: "" },
      { id: "16", name: "Thérèse Caron", role: "Négociation Billeterie", avatarUrl: "" },
      { id: "17", name: "Ugo Brunet", role: "Démarchage Local", avatarUrl: "" },
    ],
  },
  {
    id: "clubs",
    title: "Pôle Clubs & Vie Étudiante",
    members: [
      { id: "18", name: "Valérie Lemaire", role: "Coordinatrice Clubs", avatarUrl: "" },
      { id: "19", name: "William Renaud", role: "Liaison Sport / Muscu", avatarUrl: "" },
      { id: "20", name: "Xavier Dumas", role: "Liaison Esport / Musique", avatarUrl: "" },
      { id: "21", name: "Yasmine Pelletier", role: "Support Associations", avatarUrl: "" },
    ],
  },
  {
    id: "logistique",
    title: "Pôle Logistique & Matériel",
    members: [
      { id: "22", name: "Adrien Moreau", role: "Respo Local & Stocks", avatarUrl: "" },
      { id: "23", name: "Béatrice Roy", role: "Achats Fournitures", avatarUrl: "" },
      { id: "24", name: "Cédric Roux", role: "Technique & Sonorisation", avatarUrl: "" },
      { id: "25", name: "Diane Fabre", role: "Inventaire", avatarUrl: "" },
    ],
  },
];
