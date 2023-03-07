import { armor, char, damage, secondaryStats, weapon } from '../../types/types'

const MIN_EDGE_BMI = 20;
const MAX_EDGE_BMI = 20;

export const calculateSecodaryStats = (data: char): secondaryStats => {

  const {
    weaponId,
    armorId,
    height,
    weight,
    strength,
    agility,
    endurance,
    speed,
  } = data;

  return {
    health: calculateHealth(height, weight),
    hitChanse: calculateHitChance(agility, weaponId),
    damage: calculateDamage(strength, weaponId),
    dodgeChanse: calculateDodgeChance(height, armorId),
    mitigation: calculateMitigation(endurance, armorId),
    initiative: calculateInitiative(speed, weight),
  }
}

const calculateHealth = (height: number, weight: number) : number => {
  const bmi = weight / (height*height);

  if (bmi < MIN_EDGE_BMI) {
    const reducion = (MIN_EDGE_BMI - bmi)*3;
    return weight - reducion;
  }

  if (bmi > MAX_EDGE_BMI) {
    const reducion =  (bmi - MAX_EDGE_BMI)*2;
    return weight - reducion;
  }

  return weight*1.1;
}

const calculateInitiative = (speed: number, weight: number) : number => {
  return 1;
}

const calculateHitChance = (agility: number, weapon: weapon) : number => {
  return 1;
}

const calculateDamage = (strength: number, weapon: weapon) : damage => {
  return {
    minDamage: 1,
    maxDamage: 2
  };
}

const calculateDodgeChance = (height: number, armor: armor) : number => {
  return 1;
}

const calculateMitigation = (endurance: number, weight: number) : number => {
  return 1;
}
