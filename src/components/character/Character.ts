import { appearanceType, calculationsType, charInterace, statsType, charInput, damage, rating, charOutput, calculations } from "./types";
import { race, armor, weapon } from "../game/types";

const DAMAGE_COEFICIENT = 3;

const HIT_COEFICIENT = 5;
const DODGE_COEFICIENT = 5;
const MITIGATION_COEFICIENT = 2;
const INITIATIVE_COEFICIENT = 2;

const MIN_BMI_COEFICIENT = 3;
const MAX_BMI_COEFICIENT = 2;

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
      endurance,
      speed,
    } = input;

    this.name = name;
    this.race = race;
    this.armor = armor;
    this.weapon = weapon;
    this.appearance = {height, weight};
    this.stats = {strength, agility, endurance, speed};
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
      endurance: this.stats.endurance,
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
      resilience: (health + mitigation) * dodgeChanse,
      power: (((minDamage + maxDamage)/ 2) * hitChanse) * initiative
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

    return Number(health.toFixed(1));
  }

  private calculateInitiative = () : number => {
    const coef = ((this.stats.endurance + this.stats.speed) / 2) * INITIATIVE_COEFICIENT;
    const value = (coef / this.appearance.weight) * coef;

    return Number(value.toFixed(1));
  }
  
  private calculateHitChance = () : number => {
    return (this.stats.agility * HIT_COEFICIENT) * this.weapon.hitMultiplier;
  }
  
  private calculateDamage = () : damage => {
    return {
      minDamage: this.weapon.minDamage + this.stats.strength / DAMAGE_COEFICIENT,
      maxDamage: this.weapon.minDamage + this.stats.strength * DAMAGE_COEFICIENT,
    };
  }
  
  private calculateDodgeChance = () : number => {
    const coef = ((this.stats.agility + this.stats.speed) / 2) * DODGE_COEFICIENT;
    const value = ((coef / this.appearance.height) * coef) * this.armor.dodgePenalty;

    return Number(value.toFixed(1));
  }
  
  private calculateMitigation = () : number => {
    return this.armor.armorValue + this.stats.endurance / MITIGATION_COEFICIENT;
  }  
}