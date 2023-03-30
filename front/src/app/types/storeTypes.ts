/** Here types for NGRX store */

import { character, characterCalculations } from "./gameTypes"
import { gameData } from "./gameTypes"

export interface gameState {
  loading: boolean,
  error: string,
  gameData: gameData,
  character: character,
  characterCalculations: characterCalculations,
  freeStatPoints: number,
}