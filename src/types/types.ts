export type ladderChar = {
  name: string,
  playerNick: string
  raceId: race
}

export type char = {
  name: string

  raceId: race
  weaponId: weapon
  armorId: armor

  height: number
  weight: number

  strength: number
  agility: number
  endurance: number
  speed: number
}

export enum race {
  human = 1,
  elf = 2,
  orc = 3,
  dwarf = 4
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

export type secondaryStats = {
  damage: damage
  health: number
  hitChanse: number
  dodgeChanse: number
  mitigation: number
  initiative: number
}

export type fullChar = char & secondaryStats;