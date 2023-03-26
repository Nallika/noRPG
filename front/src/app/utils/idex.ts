
/**
 * Generatre random value between range
 */
export const generateRandom = (min: number, max: number): number => {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  return rand + min;
}