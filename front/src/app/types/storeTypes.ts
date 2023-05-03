/** Here types for NGRX store */

import { character, resultCharacter } from './gameTypes'
import { gameData } from './gameTypes'
import { player } from './generalTypes'
import { ladder } from './ladderTypes'

export interface GameState {
  loading: boolean,
  error: string,
  gameData: gameData,
  character: character,
  resultCharacter: resultCharacter,
  freeStatPoints: number,
  score: number,
}

export interface LadderState {
  loading: boolean,
  error: string,
  ladderChunk: ladder,
  page: number,
  isFull: boolean
}

export interface AuthState {
  isAuthenticated: boolean,
  loading: boolean,
  error: string,
  player: player
}

export interface AppState {
  auth: AuthState,
  game: GameState,
  ladder: LadderState
}