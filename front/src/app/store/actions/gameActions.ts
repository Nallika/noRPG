import { createAction, props } from "@ngrx/store";

import { character, fullCharacter, saveFormParams } from "src/app/types/gameTypes";
import { gameData } from "../../types/generalTypes";

export const getGameData = createAction('[game] get data');
export const getGameDataSuccess = createAction('[game] data success', props<{data: gameData}> ());
export const getGameDataError = createAction('[game] data error', props<{error: string}> ());

export const saveChar = createAction('[game] save char', props<{data: saveFormParams}> ());
export const submitChar = createAction('[game] submit char', props<{data: character}>);
export const submitCharError = createAction('[game] submit char error', props<{error: string}> ());
export const submitCharSuccess = createAction('[game] submit char success', props<{data: fullCharacter}> ());