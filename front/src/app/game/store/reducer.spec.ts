import { generateCharacter } from "src/app/utils/idex";
import { character, formEnum, resultCharacter, gameData } from "src/app/types/gameTypes";
import { changedCharacterStatMock, characterStatMock, raceMock_1, resultCharacterMock } from 'src/app/utils/mocks';

import { gameReducer } from './reducer';
import * as gameActions from './actions';
import { GameState } from "../../types/storeTypes";

describe('Game Reducer', () => {
  const initialState: GameState = {
    loading: false,
    error: '',
    gameData: {} as gameData,
    character: {} as character,
    resultCharacter: {} as resultCharacter,
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

  it('should handle generateChar', () => {
    const races = [raceMock_1];
    const filledState = { ...initialState, gameData: { races } as gameData };
    const action = gameActions.generateChar();
    const result = gameReducer(filledState, action);

    expect(result.character).toEqual(generateCharacter(raceMock_1));
  });

  it('should handle saveChar action', () => {
    const state: GameState = {
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
    const state: GameState = {
      ...initialState,
      freeStatPoints: 10,
    };
  
    const action = gameActions.submitChar();
  
    const expectedState: GameState = {
      ...state,
      loading: true,
      freeStatPoints: initialState.freeStatPoints,
    };
  
    expect(gameReducer(state, action)).toEqual(expectedState);
  });
  
  it('should handle submitCharSuccess action', () => {
    const score = 100;
    const state: GameState = {
      ...initialState,
      loading: true,
    };
  
    const action = gameActions.submitCharSuccess({data: {character: resultCharacterMock, score}});
  
    const expectedState: GameState = {
      ...state,
      loading: false,
      resultCharacter: resultCharacterMock,
      score,
    };
  
    expect(gameReducer(state, action)).toEqual(expectedState);
  });
  
})