/** Here types for NGRX store */

import { character, fullCharacter } from "./gameTypes"
import { gameData } from "./gameTypes"
import { ladder } from "./ladderTypes"

export interface gameState {
  loading: boolean,
  error: string,
  gameData: gameData,
  ladderData: {
    ladderChunk: ladder,
    page: number,
    isFull: boolean
  },
  character: character,
  resultCharacter: fullCharacter,
  freeStatPoints: number,
  score: number,
}