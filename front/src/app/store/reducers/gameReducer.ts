import { createReducer, on } from "@ngrx/store";

import * as gameActions from '../actions/gameActions';
import { gameState } from "../../types/storeTypes";
import { generateRandom, generateCharacter } from "src/app/utils/idex";
import { character, formEnum, fullCharacter, race, statsForm, gameData } from "src/app/types/gameTypes";

const initialState: gameState = {
  loading: false,
  error: '',
  gameData: {} as gameData,
  character: {} as character,
  resultCharacter: {} as fullCharacter,
  ladderData: {
    ladderChunk: [],
    page: 0,
    isFull: false
  },
  freeStatPoints: 20,
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
  freeStatPoints: number
  ): {newCharData: character, freeStatPoints: number } => {
    const {strength, agility, stamina, speed} = currentCharData;
    const currentStatSumm = Object.values({strength, agility, stamina, speed}).reduce((acc, val) => acc + val);
    const incomeStatSumm = Object.values(incomimgStatData).reduce((acc, val) => acc + val);

    const isIncrease = incomeStatSumm > currentStatSumm;
    freeStatPoints = isIncrease ? freeStatPoints - 1 : freeStatPoints + 1;

    // If there are no freeStatPoints we can't 
    if (freeStatPoints < 0) {
      return {newCharData: currentCharData, freeStatPoints: 0};
    }

    return {
      newCharData: {
        ...currentCharData,
        ...incomimgStatData
      },
      freeStatPoints
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
    const {character: currentCharData, freeStatPoints: currentFreeStatPoins} = state;
    const incomingCharData = action.data;

    // If stats changed we need run recalculateCharStats
    if (action.form === formEnum.stats) {
      const { newCharData, freeStatPoints } = recalculateCharStats(currentCharData, incomingCharData, currentFreeStatPoins);

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
    freeStatPoints: initialState.freeStatPoints,
  })),
  on(gameActions.resetPoints, (state: gameState) => ({
    ...state,
    loading: true,
  })),
  on(gameActions.submitCharSuccess, (state: gameState, action) => ({
    ...state,
    loading: false,
    resultCharacter: action.data.character,
    score: action.data.score
  })),
)