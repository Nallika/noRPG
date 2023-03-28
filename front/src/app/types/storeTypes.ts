/** Here types for NGRX store */

import { fullCharacter } from "./gameTypes"
import { gameData } from "./gameTypes"

export interface gameState {
  charData: {
    loading: boolean,
    error: boolean,
    character: fullCharacter
    freeStatPoints: number
  }
  gameData: {
    loading: boolean;
    error: string;
    data: gameData
  },
}