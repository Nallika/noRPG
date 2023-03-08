export interface charInterace {
  name: string
  weaponId: weapon
  armorId: armor

  appearance: appearanceType
  stats: statsType
  calculations: calculationsType
}

export type appearanceType = {
  height: number
  weight: number
  raceId: race
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

export enum race {
  Human = 1,
  Elf = 2,
  Orc = 3,
  Dwarf = 4
}

export enum weapon {
  sword,
  mace,
  spear,
}

export enum armor {
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
  weaponId: weapon
  armorId: armor
} & appearanceType & statsType

export type fullCharData = charData & calculationsType;

export type addNewCharResult = {
  character?: fullCharData
  rating?: number
  error?: string
}