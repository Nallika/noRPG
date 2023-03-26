import { character, fullCharacter } from "./gameTypes"
import { gameData, player } from "./generalTypes"

export interface gameState {
  loading: boolean;
  error: string;
  gameData: gameData,
}

export type charSaveStatuses = {
  appearanceSaved: boolean,
  statsSaved: boolean,
  itemsSaved: boolean
}

export interface charState {
  loading: boolean,
  error: boolean,
  statuses: charSaveStatuses,
  character: fullCharacter
  rating: number,
}

export interface playerState {
  player: {
    isAutenticated: boolean
    player: player
  },
}
