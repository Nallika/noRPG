export interface race {
  id: number
  title: raceTitle
  minWeight: number
	maxWeight: number
	minHeight: number
	maxHeight: number
  minEdgeBMI: number
  maxEdgeBMI: number
	initialStrength: number
	initialEndurance: number
	initialAgility: number
	initialSpeed: number
}

export type raceTitle = 'Human' | 'Elf' | 'Dwarf' | 'Orc';

export type weapon = {
  id: number
  title: weaponTitle
  description: string
  minDamage: number
  maxDamage: number
  baseHit: number
}

export type weaponTitle = 'Sword' | 'Mace' | 'Unarmed' | 'Spear';

export type armor = {
  id: number
  title: armorTitle
  description: string
  armorValue: number
  baseDodge: number
}

export type armorTitle = 'No armor' | 'Light armor' | 'Medium armor' | 'Heavy armor';
