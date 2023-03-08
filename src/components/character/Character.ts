import { appearanceType, armor, calculationsType, charInterace, fullCharData, statsType, weapon, charData, damage } from "./types";

export default class Character implements charInterace {
  
  name: string;
  weaponId: weapon;
  armorId: armor;
  appearance: appearanceType;
  stats: statsType;
  calculations: calculationsType;
  rating: number;

  constructor(input: charData) {
    const  {
      name,
      raceId,
      weaponId,
      armorId,
      height,
      weight,
      strength,
      agility,
      endurance,
      speed,
    } = input;

    this.name = name;
    this.weaponId = weaponId;
    this.armorId = armorId;
    this.appearance = {height, weight, raceId};
    this.stats = {strength, agility, endurance, speed};
    this.calculations = this.calculateSecodaryStats();
    this.rating = this.calculateRating();
  }

  public validate = () : {isValid: boolean, error: string} => {
    if (!this.validateRace()) {
      return {
        isValid: false,
        error: 'Invalid raceid'
      }
    }
  
    if (!this.validateAppearance()) {
      return {
        isValid: false,
        error: 'Invalid appearance value'
      }
    }
  
    if (!this.validateStats()) {
      return {
        isValid: false,
        error: 'Invalid stats value'
      }
    }
  
    return {
      isValid: true,
      error: ''
    }
  }

  public calculateRating = (): number => {
    const {
      health,
      hitChanse,
      damage: {minDamage, maxDamage},
      dodgeChanse,
      mitigation,
      initiative,
    } = this.calculations;
  
    const damagePerSwing = (((minDamage + maxDamage)/ 2) * hitChanse) * initiative;
    const resilence = (health + mitigation) * dodgeChanse;
  
    return Number((damagePerSwing + resilence).toFixed(2));
  }

  public getCharData = (): fullCharData => {
    return {
      name: this.name,
      raceId: this.appearance.raceId,
      weaponId: this.weaponId,
      armorId: this.armorId,
      height: this.appearance.height,
      weight: this.appearance.weight,
      strength: this.stats.strength,
      agility: this.stats.agility,
      endurance: this.stats.endurance,
      speed: this.stats.speed,
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
  
  private calculateHealth = () : number => {
    let health: number;
    const {height, weight} = this.appearance;
    const bmi = weight / ((height/100)*(height/100));
  
    if (bmi < 20) {
      const reducion = (20 - bmi) * 3;
      health = weight - reducion;
    } else if (bmi > 30) {
      const reducion =  (bmi - 30) * 2;
      health = weight - reducion;
    } else {
      health = (weight*1.1);
    }
  
    return Number(health.toFixed(1));
  }
  
  private calculateInitiative = () : number => {
    return 1;
  }
  
  private calculateHitChance = () : number => {
    return 1;
  }
  
  private calculateDamage = () : damage => {
    return {
      minDamage: 1,
      maxDamage: 2
    };
  }
  
  private calculateDodgeChance = () : number => {
    return 1;
  }
  
  private calculateMitigation = () : number => {
    return 1;
  }
  
  private validateRace = () : boolean => {
    return true;
  }
  
  private validateAppearance = () : boolean => {
    return true;
  }
  
  private validateStats = () : boolean => {
    return true;
  }
  
}