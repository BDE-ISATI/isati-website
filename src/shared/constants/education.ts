import type { UsersSchoolYearOptions, UsersSpecialityOptions, UsersLevelOptions } from '@/shared/types/pocketbase-types';

const levels: { key: UsersLevelOptions; name: string }[] = [
  { key: "preparatoire", name: "Cycle préparatoire" },
  { key: "ingenieur", name: "Cycle ingénieur" },
];

const years: { key: UsersSchoolYearOptions; name: string }[] = [
  { key: "1", name: "Première année" },
  { key: "2", name: "Deuxième année" },
  { key: "3", name: "Troisième année" },
];


const specialities: { key: UsersSpecialityOptions; name: string }[] = [
  { key: "info", name: "Informatique" },
  { key: "snr", name: "Systèmes numériques et réseaux" },
  { key: "tis", name: "Technologie de l'information pour la santé" },
  { key: "mat", name: "Matériaux" },
];


export {levels, years, specialities}