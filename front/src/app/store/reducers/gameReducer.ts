import { createReducer, on } from "@ngrx/store";

import * as gameActions from '../actions/gameActions';
import { gameState } from "../../types/storeTypes";
import { generateRandom, generateCharacter } from "src/app/utils/idex";
import { character, formEnum, resultCharacter, race, statsForm, gameData } from "src/app/types/gameTypes";

export const FREE_STAT_POINTS = 20;
export const INITIAL_STAT_POINTS = 10;

const initialState: gameState = {
  loading: false,
  error: '',
  gameData: {} as gameData,
  character: {} as character,
  resultCharacter: {} as resultCharacter,
  ladderData: {
    ladderChunk: [],
    page: 0,
    isFull: false
  },
  freeStatPoints: FREE_STAT_POINTS,
  score: 0,
};

/**
 * Pick rabdom race from race list
 */
const generateRandomRace = (races: race[]): race => {
  return races[generateRandom(0, races.length)];
}

/**
 * Validate incoming stat values, and calculate freeStatPoints.
 * Used when user change any stat value.
 */
const recalculateCharStats = (
  currentCharData: character,
  incomimgStatData: statsForm,
  ): {newCharData: character, freeStatPoints: number } => {
    const statSumm = Object.values(incomimgStatData).reduce((acc, val) => acc + val);
    const newFreeStatPoints = FREE_STAT_POINTS + INITIAL_STAT_POINTS - statSumm;

    // If there are no freeStatPoints we can't increase stats
    if (newFreeStatPoints < 0) {
      return {newCharData: currentCharData, freeStatPoints: 0};
    }

    return {
      newCharData: {
        ...currentCharData,
        ...incomimgStatData
      },
      freeStatPoints: newFreeStatPoints
    }
}

/**
 * Manage base game store, receive game data, save character data and submit it to server
 */
export const gameReducer = createReducer(
  initialState,
  on(gameActions.getGameData, (state: gameState) => ({
    ...state,
    loading: true,
  })),
  on(gameActions.gameError, (state: gameState, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(gameActions.getGameDataSuccess, (state: gameState, action) => ({
    ...state,
    loading: false,
    gameData: action.data,
  })),
  on(gameActions.getLadder, (state: gameState) => ({
    ...state,
    loading: true,
    ladderData: {
      ...state.ladderData,
      page: state.ladderData.page + 1
    }
  })),
  on(gameActions.resetLadder, (state: gameState) => ({
    ...state,
    ladderData: initialState.ladderData
  })),
  on(gameActions.getLadderSuccess, (state: gameState, action) => ({
    ...state,
    loading: false,
    ladderData: {
      ...state.ladderData,
      ladderChunk: action.ladder,
      isFull: action.isFull
    }
  })),
  on(gameActions.generateChar, (state: gameState) => {
    const randomRace = generateRandomRace(state.gameData.races);

    return {
      ...state,
      character: generateCharacter(randomRace)
    }
  }),
  on(gameActions.saveChar, (state: gameState, action) => {
    const {character: currentCharData } = state;
    const incomingCharData = action.data;

    // If stats changed we need run recalculateCharStats
    if (action.form === formEnum.stats) {
      const { newCharData, freeStatPoints } = recalculateCharStats(currentCharData, incomingCharData);

      return {
        ...state,
        freeStatPoints,
        character: {
          ...currentCharData,
          ...newCharData,
        }
      }
    }

    return {
      ...state,
      character: {
        ...currentCharData,
        ...incomingCharData,
      }
    }
  }),
  on(gameActions.submitChar, (state: gameState) => ({
    ...state,
    loading: true,
    freeStatPoints: initialState.freeStatPoints,
  })),
  on(gameActions.submitCharSuccess, (state: gameState, action) => ({
    ...state,
    loading: false,
    resultCharacter: action.data.character,
    score: action.data.score
  })),
)