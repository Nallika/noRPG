import BattleCharacter from "./BattleCharacter";
import Character from "../character/Character";
import { rating } from "../character/types";
import { generateOponentByRating } from "./generators";

const LIMIT = 20;

export const scoreCalculator = (char: Character): number => {
  const rating = char.getRating();

  runEncounter(char, rating);

  return Math.floor(rating.power + rating.resilience);
}

const runEncounter = (char: Character, rating: rating) => {
  const warior = new BattleCharacter({name: char.name, ...char.getCharCalculations()});
  const oponent = generateOponentByRating(rating);

  const queue = generateQueue(warior.initiative, oponent.initiative);

console.log('---------- !!!!!!!!!!!!!!!!!!!!!! queue', queue);

  // Run battle in generated queue
  for (let i = 0; i < queue.length; i++) {
    const result = swing(warior, oponent, queue[i]);

    // If someone is dead return result
    if (result !== null) {
      console.log(`!!!!!!!!!!!!!!!!! ${result ? oponent.name : warior.name} DEAD, winner HP = ${!result ? oponent.hitPoints : warior.hitPoints}`);
      return result;
    }
  }
  console.log('---------- BATTLE ENDED TECHNICALLY --------- ', {
    charHp: warior.hitPoints,
    oppHp: oponent.hitPoints
  });
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