import { fullCharacter } from "./gameTypes"
import { gameData } from "./generalTypes"

export interface gameState {
  charData: {
    loading: boolean,
    error: boolean,
    isSaved: boolean,
    character: fullCharacter
    
    freeStatPoints: number
  }
  gameData: {
    loading: boolean;
    error: string;
    data: gameData
  },
}