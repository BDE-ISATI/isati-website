import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type salles = {
    vacant:{salleID:string,batimentID:string,until:number,type:string}[]
    occupied:{salleID:string,batimentID:string,until:number,type:string}[]
    none:{salleID:string,batimentID:string,type:string}[]
}

type member = {
    ID:string,
    nom:string,
    contact:string,
    photo:string,
    rôle:string,
    URL:string|null,
    groupe:string
}

type event = {
    nom:string,
    date:number,
    type:string,
    article:string,
    emplacement:string,
    URL:string|null
}

type members_public = {
    [key:string] : member[]
}

type members_private = member[]

type events_public = event[]
type events_private = event[]

export type articlesType = {
    ID:string,
    nom:string,
    "release-date":string,
    "update-date":string,
    categorie:string,
    description:string
}[]

export const events_public:Writable<events_public> = writable([]);
export const events_private:Writable<events_private> = writable([]);
export const salles:Writable<salles> = writable({vacant:[],occupied:[],none:[]});
export const members_public:Writable<members_public> = writable({});
export const members_private:Writable<members_private> = writable([]);
export const articles:Writable<articlesType> = writable([]);

export const logged = writable(false)
