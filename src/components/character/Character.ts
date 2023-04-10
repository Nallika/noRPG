import { appearanceType, calculationsType, charInterace, statsType, charInput, damage, rating, charOutput, calculations } from "./types";
import { race, armor, weapon } from "../game/types";

const MIN_DAMAGE_COEFICIENT = 2;
const MAX_DAMAGE_COEFICIENT = 3;

const HIT_COEFICIENT = 2;
const DODGE_COEFICIENT = 1.5;
const MITIGATION_COEFICIENT = 2;
const INITIATIVE_COEFICIENT = 2;

const MIN_BMI_COEFICIENT = 3;
const MAX_BMI_COEFICIENT = 2;
export const DODGE_RESILENCE_COEFICIENT = 150;

export default class Character implements charInterace {
  name: string;
  weapon: weapon;
  armor: armor;
  race: race;
  appearance: appearanceType;
  stats: statsType;
  calculations: calculationsType;
  rating: rating;

  constructor(input: charInput) {
    const  {
      name,
      race,
      weapon,
      armor,
      height,
      weight,
      strength,
      agility,
      stamina,
      speed,
    } = input;

    this.name = name;
    this.race = race;
    this.armor = armor;
    this.weapon = weapon;
    this.appearance = {height, weight};
    this.stats = {strength, agility, stamina, speed};
    this.calculations = this.calculateSecodaryStats();
    this.rating = this.calculateRating();
  }

  public getRating = (): rating => this.rating;

  public getOutput = (): charOutput => {
    return {
      name: this.name,
      race: this.race.title,
      weapon: this.weapon.title,
      armor: this.armor.title,
      height: this.appearance.height,
      weight: this.appearance.weight,
      strength: this.stats.strength,
      agility: this.stats.agility,
      stamina: this.stats.stamina,
      speed: this.stats.speed,
      health: this.calculations.health,
      hitChanse: this.calculations.hitChanse,
      damage: `${this.calculations.damage.minDamage}-${this.calculations.damage.maxDamage}`,
      dodgeChanse: this.calculations.dodgeChanse,
      mitigation: this.calculations.mitigation,
      initiative: this.calculations.initiative,
    }
  }

  public getCharCalculations = (): calculationsType => {
    return {
      health: this.calculations.health,
      hitChanse: this.calculations.hitChanse,
      damage: this.calculations.damage,
      dodgeChanse: this.calculations.dodgeChanse,
      mitigation: this.calculations.mitigation,
      initiative: this.calculations.initiative,
    }
  }

  private calculateSecodaryStats = (): calculationsType => {
    return {
      health: this.calculateHealth(),
      hitChanse: this.calculateHitChance(),
      damage: this.calculateDamage(),
      dodgeChanse: this.calculateDodgeChance(),
      mitigation: this.calculateMitigation(),
      initiative: this.calculateInitiative(),
    }
  }

  private calculateRating = (): rating => {
    const {
      health,
      hitChanse,
      damage: {minDamage, maxDamage},
      dodgeChanse,
      mitigation,
      initiative,
    } = this.calculations;

    return {
      resilience: Math.floor((health + mitigation) + (DODGE_RESILENCE_COEFICIENT * (dodgeChanse / 100))),
      power: Math.floor((((minDamage + maxDamage) / 2) * (hitChanse / 100)) * initiative)
    }
  }
  
  private calculateHealth = () : number => {
    let health: number;
    const {height, weight} = this.appearance;
    const bmi = weight / ((height / 100)*(height / 100));

    if (bmi < this.race.minEdgeBMI) {
      const reducion = (this.race.minEdgeBMI - bmi) * MIN_BMI_COEFICIENT;
      health = weight - reducion;
    } else if (bmi > this.race.maxEdgeBMI) {
      const reducion =  (bmi - this.race.maxEdgeBMI) * MAX_BMI_COEFICIENT;
      health = weight - reducion;
    } else {
      health = (weight*1.5);
    }

    return Math.floor(health);
  }

  private calculateInitiative = () : number => {
    const value = (this.stats.stamina + this.stats.speed) / INITIATIVE_COEFICIENT;

    return Math.floor(value);
  }
  
  private calculateHitChance = () : number => {
    const value = this.weapon.baseHit + (this.stats.agility * HIT_COEFICIENT);

    return Math.floor(value);
  }
  
  private calculateDamage = () : damage => {
    const minDamage = this.weapon.minDamage + this.stats.strength * MIN_DAMAGE_COEFICIENT;
    const maxDamage = this.weapon.minDamage + this.stats.strength * MAX_DAMAGE_COEFICIENT;

    return {
      minDamage:  Math.floor(minDamage),
      maxDamage:  Math.floor(maxDamage),
    };
  }
  
  private calculateDodgeChance = () : number => {
    const value = this.armor.baseDodge + (this.stats.agility + this.stats.speed) / DODGE_COEFICIENT;

    return Math.floor(value);
  }
  
  private calculateMitigation = () : number => {
    return Math.floor(this.armor.armorValue + this.stats.stamina / MITIGATION_COEFICIENT);
  }
}