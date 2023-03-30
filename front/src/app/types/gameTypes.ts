/** Here types for game components */

export interface character {
  raceId: number,
  height: number,
  weight: number,
  strength: number,
  agility: number,
  endurance: number,
  speed: number,
  name: string,
  armorId: number,
  weaponId: number,
}

export interface characterCalculations {
  damage: {
    minDamage: number,
    maxDamage: number
  }
  dodgeChanse: number,
  health: number,
  hitChanse: number,
  initiative: number,
  mitigation: number
  score: number,
}

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
	initialspeed: number,
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

export interface weapon extends item {
	minDamage: number,
	maxDamage: number,
}

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
  endurance: number,
  speed: number,
}

export type gameData = {
  races: race[] | any,
  weapons: weapon[],
  armor: armor[],
}
