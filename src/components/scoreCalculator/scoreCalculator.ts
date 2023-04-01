import BattleCharacter from "./BattleCharacter";
import Character from "../character/Character";
import { rating } from "../character/types";
import { generateOponentByRating } from "./generators";

const LIMIT = 20;
const PACE = 10;

export const scoreCalculator = (char: Character): number => {
  const rating = char.getRating();

  runEncounter(char, rating);

  return rating.power + rating.resilience;
}

const runEncounter = (char: Character, rating: rating) => {
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

  if (char.isDead()) {
    return false;
  }

  if (oponent.isDead()) {
    return true;
  }

  return null;
}

/**
 * Generate battle queue. True means it's character swing, false - oponent.
 */
const generateQueue = (charInitiative: number, oponentInitiative: number): boolean[] => {
  const initiativeDifference = charInitiative - oponentInitiative;

  return Array.from(Array(LIMIT)).map((_, index) => index % 2 === 0);
}