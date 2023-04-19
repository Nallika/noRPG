import { generateCharacter } from "src/app/utils/idex";
import { character, formEnum, resultCharacter, gameData } from "src/app/types/gameTypes";
import { changedCharacterStatMock, characterStatMock, getLadderMock, raceMock_1, resultCharacterMock } from 'src/app/utils/mocks';

import { gameReducer } from './gameReducer';
import * as gameActions from '../actions/gameActions';
import { gameState } from "../../types/storeTypes";

describe('Game Reducer', () => {
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
    freeStatPoints: 20,
    score: 0,
  };

  it('should handle getGameData', () => {
    const action = gameActions.getGameData();
    const result = gameReducer(initialState, action);

    expect(result.loading).toEqual(true);
  });

  it('should handle gameError', () => {
    const errorMessage = 'An error occurred';
    const action = gameActions.gameError({error: errorMessage});
    const result = gameReducer(initialState, action);

    expect(result.loading).toEqual(false);
    expect(result.error).toEqual(errorMessage);
  });

  it('should handle getGameDataSuccess', () => {
    const gameData: gameData = {
      races: [],
      weapons: [],
      armor: []
    };
    const action = gameActions.getGameDataSuccess({ data: gameData });
    const result = gameReducer(initialState, action);

    expect(result.loading).toEqual(false);
    expect(result.gameData).toEqual(gameData);
  });

  it('should handle getLadder', () => {
    const action = gameActions.getLadder();
    const result = gameReducer(initialState, action);

    expect(result.loading).toEqual(true);
    expect(result.ladderData.page).toEqual(1);
  });

  it('should handle resetLadder', () => {
    const action = gameActions.resetLadder();
    const result = gameReducer(initialState, action);
    expect(result.ladderData).toEqual(initialState.ladderData);
  });

  it('should handle getLadderSuccess', () => {
    const ladderData = {
      ladder: getLadderMock('First'),
      isFull: false,
    };
    const action = gameActions.getLadderSuccess(ladderData);
    const result = gameReducer(initialState, action);

    expect(result.loading).toEqual(false);
    expect(result.ladderData.ladderChunk).toEqual(ladderData.ladder);
    expect(result.ladderData.isFull).toEqual(ladderData.isFull);
  });

  it('should handle generateChar', () => {
    const races = [raceMock_1];
    const filledState = { ...initialState, gameData: { races } as gameData };
    const action = gameActions.generateChar();
    const result = gameReducer(filledState, action);

    expect(result.character).toEqual(generateCharacter(raceMock_1));
  });

  it('should handle saveChar action', () => {
    const state: gameState = {
      ...initialState,
      character: characterStatMock as character,
      freeStatPoints: 6,
    };
  
    const action = gameActions.saveChar({data: changedCharacterStatMock as character, form: formEnum.stats});

    expect(gameReducer(state, action)).toEqual({
      ...state,
      freeStatPoints: 2,
      character: changedCharacterStatMock as character,
    });
  });
  
  it('should handle submitChar action', () => {
    const state: gameState = {
      ...initialState,
      freeStatPoints: 10,
    };
  
    const action = gameActions.submitChar();
  
    const expectedState: gameState = {
      ...state,
      loading: true,
      freeStatPoints: initialState.freeStatPoints,
    };
  
    expect(gameReducer(state, action)).toEqual(expectedState);
  });
  
  it('should handle submitCharSuccess action', () => {
    const score = 100;
    const state: gameState = {
      ...initialState,
      loading: true,
    };
  
    const action = gameActions.submitCharSuccess({data: {character: resultCharacterMock, score}});
  
    const expectedState: gameState = {
      ...state,
      loading: false,
      resultCharacter: resultCharacterMock,
      score,
    };
  
    expect(gameReducer(state, action)).toEqual(expectedState);
  });
  
})