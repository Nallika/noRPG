import BattleCharacter from './BattleCharacter';
import Character from '../character/Character';
import { rating } from '../character/types';
import { generateOponentByRating } from './generators';

const LIMIT = 50;

export const scoreCalculator = (char: Character): number => {
  let rating = char.getRating();
  const firstResult = runEncounter(char, rating);

  for (let index= 1; index < LIMIT; index++) {
    rating = iterateRating(rating, firstResult);
    const newResult = runEncounter(char, rating);

    if (firstResult !== newResult) {
      return Math.floor(rating.power + rating.resilience);
    }
  }

  return Math.floor(rating.power + rating.resilience);
}

const iterateRating = ({resilience, power}: rating, increase: boolean): rating => {
  return increase ?
    { resilience: resilience + 5, power: power + 5 } : 
    { resilience: resilience - 5, power: power - 5 }; 
}

const runEncounter = (char: Character, rating: rating): boolean => {
  const warior = new BattleCharacter({name: char.name, ...char.getCharCalculations()});
  const oponent = generateOponentByRating(rating);

  const queue = generateQueue(warior.initiative, oponent.initiative);

  // Run battle in generated queue
  for (let i = 0; i < queue.length; i++) {
    const result = swing(warior, oponent, queue[i]);

    // If someone is dead return result
    if (result !== null) {
      return result;
    }
  }

  // If noone is dead, winner determinated by remaining hit points.
  return warior.hitPoints > oponent.hitPoints;
}

/**
 * Run swing by one of oponents, other hurn swing damage if it was success,
 * Check is someone dead after.
 * return true if oponent dead, false if char dead, null otherwise
 */
const swing = (char: BattleCharacter, oponent: BattleCharacter, turn: boolean): boolean | null => {
  // Depends on turn character or oponent swing.
  if (turn) {
    oponent.hurt(char.swing());
  } else {
    char.hurt(oponent.swing());
  }

  if (char.isDead() || oponent.isDead()) {
    return oponent.isDead();
  }

  return null;
}

/**
 * Generate battle queue. True means it's character swing, false - oponent.
 */
const generateQueue = (charInitiative: number, oponentInitiative: number): boolean[] => {
  const isCharBigger = charInitiative >= oponentInitiative;
  const initiativeDifference = Math.floor(Math.abs(charInitiative - oponentInitiative));
  const sequence = [isCharBigger, !isCharBigger];
  const additionalHitSequence = [isCharBigger, isCharBigger, !isCharBigger];
  const queue = [];

  // Add additional swings
  for (let i = 0; i < initiativeDifference; i++) {
    queue.push(additionalHitSequence);
  }

  // Add regular swings
  for (let i = 0; i < LIMIT / 2; i++) {
    queue.push(sequence);
  }

  return queue.flat();
}