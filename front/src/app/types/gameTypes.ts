/** Here types for game components */

export interface character {
  raceId: number,
  height: number,
  weight: number,
  strength: number,
  agility: number,
  stamina: number,
  speed: number,
  name: string,
  armorId: number,
  weaponId: number,
}

export type resultCharacter = {
  name: string;
  weapon: string;
  armor: string;
  race: string;
  height: number,
  weight: number,
  strength: number,
  agility: number,
  stamina: number,
  speed: number,
  damage: string,
  dodgeChanse: number,
  health: number,
  hitChanse: number,
  initiative: number,
  mitigation: number
};

export type race = {
  id: number,
  title: raceEnum,
  minWeight: number,
	maxWeight: number,
	minHeight: number,
	maxHeight: number,
	initialStrength: number,
	initialEndurance: number,
	initialAgility: number,
	initialSpeed: number,
  description: string,
}

export enum raceEnum {
  Human,
  Elf,
  Orc,
  Dwarf
}

export interface item {
  id: number,
  title: string,
  description: string,
}

export interface damage {
	minDamage: number,
	maxDamage: number,
}

export interface weapon extends item, damage {}

export interface armor extends item {
  armorValue: number,
}

export type itemType = 'armor' | 'weapon';

export enum itemEnum  {
  weapon = 'weapon',
  armor = 'armor',
}

export enum formEnum {
  appearance,
  stats,
  items
}

export type appearanceForm = {
  name: string,
  raceId: number,
  height: number,
  weight: number
}

export type statsForm = {
  strength: number,
  agility: number,
  stamina: number,
  speed: number,
}

export type gameData = {
  races: race[],
  weapons: weapon[],
  armor: armor[],
}
