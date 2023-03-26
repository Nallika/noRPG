export interface character {
  name: string,
  raceId: number,
  height: number,
  weight: number,
  strength: number,
  agility: number,
  endurance: number,
  speed: number,
  armorId: number,
  weaponId: number,
}

export interface fullCharacter extends character {
  damage: {
    minDamage: number,
    maxDamage: number
  }
  dodgeChanse: number,
  health: number,
  hitChanse: number,
  initiative: number,
  mitigation: number
  rating: number,
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

export type weapon = {
  title: string,
	minDamage: number,
	maxDamage: number,
	description: string,
}

export type armor = {
  title: string,
  armorValue: number,
  description: string,
}

export enum formEnum {
  appearance,
  stats,
  items
}

export type saveFormParams = {
  formData: character,
  formType: formEnum
}
