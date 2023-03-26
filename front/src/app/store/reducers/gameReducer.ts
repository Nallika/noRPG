import { createReducer, on } from "@ngrx/store";

import { getGameData, getGameDataError, getGameDataSuccess } from '../actions/gameActions';
import { gameState } from "../../types/storeTypes";

const initialState: gameState = {
  loading: false,
  error: '',
  gameData: {
    races: [],
    weapons: [],
    armor: [],
  }
};

export const gameReducer = createReducer(
  initialState,
  on(getGameData, (state: gameState) => ({
    ...state,
    loading: true
  })),
  on(getGameDataError, (state: gameState, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(getGameDataSuccess, (state: gameState, action) => ({
    ...state,
    gameData: action.data,
    loading: false,
  })),
)