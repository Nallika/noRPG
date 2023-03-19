export type player = {
  token: string;
  nickname: string;
}

export type authType = 'register' | 'login';

export type urlType = 'game' | 'login' | 'register' | 'ladder' | 'newChar';

export type race = {
  id: number;
  title: raceEnum;
  minWeight: number;
	maxWeight: number;
	minHeight: number;
	maxHeight: number;
	initialStrength: number;
	initialEndurance: number;
	initialAgility: number;
	initialspeed: number;
}

export enum raceEnum {
  Human,
  Elf,
  Orc,
  Dwarf
}

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
  raceId: number;

  height: number;
  weight: number;

  strength: number;
  agility: number;
  endurance: number;
  speed: number;

  armorId: number;
  weaponId: number;
}