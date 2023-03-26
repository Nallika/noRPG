import { createReducer, on } from "@ngrx/store";

import * as gameActions from '../actions/gameActions';
import { gameState } from "../../types/storeTypes";

const initialState: gameState = {
  gameData: {
    loading: false,
    error: '',
    data: {
      races: [],
      weapons: [],
      armor: [],
    }
  },
  charData: {
    loading: false,
    error: false,
    isSaved: false,
    character: {
      name: '',
      raceId: 1,
      height: 0,
      weight: 0,
      strength: 0,
      agility: 0,
      endurance: 0,
      speed: 0,
      armorId: 1,
      weaponId: 1,
      damage: {
        minDamage: 0,
        maxDamage: 0
      },
      dodgeChanse: 0,
      health: 0,
      hitChanse: 0,
      initiative: 0,
      mitigation: 0,
      rating: 0
    },
    freeStatPoints: 20
  }
};

export const gameReducer = createReducer(
  initialState,
  on(gameActions.getGameData, (state: gameState) => ({
    ...state,
    gameData: {
      ...state.gameData,
      loading: true
    }}
  )),
  on(gameActions.getGameDataError, (state: gameState, action) => ({
    ...state,
    gameData: {
      ...state.gameData,
      loading: true
    }}
  )),
  on(gameActions.getGameDataSuccess, (state: gameState, action) => ({
    ...state,
    gameData: {
      ...state.gameData,
      data: action.data,
      loading: false,
    }
  })),
  on(gameActions.saveChar, (state: gameState, action) => ({
    ...state,
    charData: {
      ...state.charData,
      character: {
        ...state.charData.character,
        ...action.data.formData,
        isSaved: true,
      }
    }
  })),
  on(gameActions.submitCharError, (state: gameState) => ({
    ...state,
    charData: {
      ...state.charData,
      character: {
        ...state.charData.character,
        error: true,
      }
    }
  })),
  on(gameActions.submitChar, (state: gameState) => ({
    ...state,
    charData: {
      ...state.charData,
      character: {
        ...state.charData.character,
        loading: true,
      }
    }
  })),
  on(gameActions.submitCharSuccess, (state: gameState, action) => ({
    ...state,
    charData: {
      ...state.charData,
      character: {
        ...state.charData.character,
        character: action.data,
        loading: false,
      }
    }
  })),
)