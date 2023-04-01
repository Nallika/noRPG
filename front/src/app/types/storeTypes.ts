/** Here types for NGRX store */

import { character, fullCharacter } from "./gameTypes"
import { gameData } from "./gameTypes"

export interface gameState {
  loading: boolean,
  error: string,
  gameData: gameData,
  character: character,
  resultCharacter: fullCharacter,
  freeStatPoints: number,
  score: number,
}