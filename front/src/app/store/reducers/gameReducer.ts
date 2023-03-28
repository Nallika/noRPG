import { createReducer, on } from "@ngrx/store";

import * as gameActions from '../actions/gameActions';
import { gameState } from "../../types/storeTypes";
import { generateRandom, generateCharValues } from "src/app/utils/idex";
import { formEnum, fullCharacter, race, statsForm } from "src/app/types/gameTypes";

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
  currentCharData: fullCharacter,
  incomimgStatData: statsForm,
  freeStatPoints: number
  ): {newCharData: fullCharacter, freeStatPoints: number } => {
    const {strength, agility, endurance, speed} = currentCharData;
    const currentStatSumm = Object.values({strength, agility, endurance, speed}).reduce((acc, val) => acc + val);
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
    gameData: {
      ...state.gameData,
      loading: true
    }}
  )),
  on(gameActions.getGameDataError, (state: gameState) => ({
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
  on(gameActions.generateChar, (state: gameState) => {
    const randomRace = generateRandomRace(state.gameData.data.races);
    return {
      ...state,
      charData: {
        ...state.charData,
        character: {
          ...state.charData.character,
          ...generateCharValues(randomRace),
        }
      }
  }}),
  on(gameActions.saveChar, (state: gameState, action) => {
    const {character: currentCharData, freeStatPoints: currentFreeStatPoins} = state.charData;
    const incomingCharData = action.data;

    // If stats changed we need run recalculateCharStats
    if (action.form === formEnum.stats) {
      const { newCharData, freeStatPoints } = recalculateCharStats(currentCharData, incomingCharData, currentFreeStatPoins);

      return {
        ...state,
        charData: {
          ...state.charData,
          freeStatPoints,
          character: {
            ...currentCharData,
            ...newCharData,
          }
        }
      }
    }

    return {
    ...state,
    charData: {
      ...state.charData,
      character: {
        ...currentCharData,
        ...incomingCharData,
      }
    }
  }}),
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