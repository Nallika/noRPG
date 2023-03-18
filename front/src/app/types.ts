export type player = {
  token: string;
  nickname: string;
}

export type authType = 'register' | 'login';

export type urlType = 'game' | 'login' | 'register' | 'ladder' | 'newChar';

export enum race {
  human,
  elf,
  orc,
  dwarf
};

export type authData = {
  email: string;
  password: string;
  nickname?: string;
}

export type weapon = {
  title: string;
	minDamage: number;
	maxDamage: number;
	description: string;
}

export type armor = {
  title: string;
  armorValue: number;
  description: string;
}

export type gameData = {
  races: race[],
  weapons: weapon[],
  armor: armor[],
}

export interface character {
  name: string;
  race: race;

  height: number;
  weight: number;

  strength: number;
  agility: number;
  endurance: number;
  speed: number;

  armorId: number;
  weaponId: number;
}