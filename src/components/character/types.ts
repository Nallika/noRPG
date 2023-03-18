export interface charInterace {
  name: string
  weaponId: number
  armorId: number

  appearance: appearanceType
  stats: statsType
  calculations: calculationsType
  rating: number

  validate: Function
}

export type appearanceType = {
  height: number
  weight: number
  raceId: number
}

export type statsType = {
  strength: number
  agility: number
  endurance: number
  speed: number
}

export type calculationsType = {
  damage: damage
  health: number
  hitChanse: number
  dodgeChanse: number
  mitigation: number
  initiative: number
}

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

export type weapon = {
  id: number;
  title: weaponEnum;
  description: string;
  minDamage: number;
  maxDamage: number;
}

export enum weaponEnum {
  sword,
  mace,
  spear
}

export type armor = {
  id: number;
  title: armorEnum;
  description: string;
  armorValue: number;
}

export enum armorEnum {
  light,
  medium,
  heavy,
}

export type damage = {
  minDamage: number
  maxDamage: number
}

export type charData = {
  name: string
  weaponId: number
  armorId: number
} & appearanceType & statsType

export type fullCharData = charData & calculationsType;

export type addNewCharResult = {
  character?: fullCharData
  rating?: number
  error?: string
}