import { randomIntFromInterval } from '../common/utils';
import { battleCharacterInterace, battleCharInput, calculationsType, damage } from '../character/types';

export default class BattleCharacter implements battleCharacterInterace {

  name: string;
  hitPoints: number;
  damage: damage;
  hitChanse: number;
  dodgeChanse: number;
  mitigation: number;
  initiative: number;

  constructor(input: battleCharInput) {
    this.name = input.name;
    this.hitChanse = input.hitChanse,
    this.damage = input.damage,
    this.dodgeChanse = input.dodgeChanse,
    this.mitigation = input.mitigation,
    this.initiative = input.initiative,
    this.hitPoints = input.health;
  }

  public swing(): number {
    const chance = this.roll(this.hitChanse);

    if (chance) {
      const {minDamage, maxDamage} = this.damage;
      const value = randomIntFromInterval(minDamage, maxDamage);
      return value;
    }

    return 0;
  }

  public hurt(income: number): void {
    const chance = this.roll(this.dodgeChanse);

    if (!income || chance) {
      return;
    }

    const value = income - this.mitigation;

    if (value > 0) {
      this.hitPoints = this.hitPoints - value;
    }
  }

  private roll(chance: number): boolean {
    return chance >= Math.floor(Math.random() * 100);
  }

  public isDead(): boolean {
    return this.hitPoints <= 0;
  }
}