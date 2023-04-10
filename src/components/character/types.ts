import { race, armor, weapon } from "../game/types";

export interface charInterace {
  name: string
  race: race
  weapon: weapon
  armor: armor

  appearance: appearanceType
  stats: statsType
  calculations: calculationsType
  rating: rating

  getRating: Function
  getOutput: Function
  getCharCalculations: Function
}

export interface battleCharacterInterace {
  damage: damage
  hitPoints: number
  hitChanse: number
  dodgeChanse: number
  mitigation: number
  initiative: number

  swing: Function
  hurt: Function
  isDead: Function
}

export type rating = {
  resilience: number
  power: number
}

export type appearanceType = {
  height: number
  weight: number
}

export type statsType = {
  strength: number
  agility: number
  stamina: number
  speed: number
}

export interface resilensCalculations {
  health: number
  dodgeChanse: number
  mitigation: number
}

export interface powerCalculations {
  damage: damage,
  hitChanse: number
  initiative: number
}

export interface calculations {
  health: number
  hitChanse: number
  dodgeChanse: number
  mitigation: number
  initiative: number
}

export type calculationsType = resilensCalculations & powerCalculations;

export type damage = {
  minDamage: number
  maxDamage: number
}

export interface battleCharInput extends calculationsType {
  name: string
}

// Input params for create a new char
export type charInput = {
  name: string
  race: race
  weapon: weapon
  armor: armor
} & appearanceType & statsType;

export type charData = {
  name: string
  raceId: number
  weaponId: number
  armorId: number
} & appearanceType & statsType;

// Full char data for send to front
export type charOutput = {
  name: string
  race: string
  weapon: string
  armor: string
  damage: string
} & appearanceType & statsType & calculations;

export type addNewCharResult = {
  result?: {
    character: charOutput
    score: number
  }
  error?: string
}