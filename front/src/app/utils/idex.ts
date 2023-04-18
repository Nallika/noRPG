import { character, race } from "../types/gameTypes";

/** Here pure functions for general use */

/**
 * Generatre random value between range
 */
export const generateRandom = (min: number, max: number): number => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  return rand + min;
}

/**
 * Generate default character values according to race
 */
export const generateCharacter = (race: race): character  => ({
  name: '',
  raceId: race.id,
  weaponId: 1,
  armorId: 1,
  height: (race.minHeight + race.maxHeight) / 2,
  weight: (race.minWeight + race.maxWeight) / 2,
  strength: race.initialStrength,
  agility: race.initialAgility,
  stamina: race.initialEndurance,
  speed: race.initialSpeed
});