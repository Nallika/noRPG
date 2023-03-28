import { charValues, race } from "../types/gameTypes";

/** Here pure functions for general use */

/**
 * Generatre random value between range
 */
export const generateRandom = (min: number, max: number): number => {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  return rand + min;
}

/**
 * Generate default char values according to race
 */
export const generateCharValues = (race: race): charValues  => ({
  raceId: race.id,
  height: (race.minHeight + race.maxHeight) / 2,
  weight: (race.minWeight + race.maxWeight) / 2,
  strength: race.initialStrength,
  agility: race.initialAgility,
  endurance: race.initialEndurance,
  speed: race.initialspeed
});