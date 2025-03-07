import { writable } from 'svelte/store';

export const downloadLink = writable<string>("https://github.com/Kuttesch/Issuence/releases/latest");

export const theme = writable<"dark" | "light">("dark");