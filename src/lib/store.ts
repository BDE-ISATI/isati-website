import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type salles = {
    vacant:{salleID:string,batimentID:string,until:number}[]
    occupied:{salleID:string,batimentID:string,until:number}[]
    none:{salleID:string,batimentID:string}[]
}

type members = {
    ID:string,
    nom:string,
    contact:string,
    photo:string,
    rôle:string
}[]

type events = {
    nom:string,
    date:number,
    type:string,
    emplacement:string
}[]

type articles = {
    ID:string,
    nom:string,
    "release-date":string,
    "update-date":string,
    categorie:string
}[]

export const events:Writable<events> = writable([]);
export const salles:Writable<salles> = writable({vacant:[],occupied:[],none:[]});
export const members:Writable<members> = writable([]);
export const articles:Writable<articles> = writable([]);

export const logged = writable(false)
