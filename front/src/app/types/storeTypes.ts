/** Here types for NGRX store */

import { character, resultCharacter } from "./gameTypes"
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
  resultCharacter: resultCharacter,
  freeStatPoints: number,
  score: number,
}