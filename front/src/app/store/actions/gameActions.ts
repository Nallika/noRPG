import { createAction, props } from "@ngrx/store";

import { character, characterCalculations, formEnum } from "src/app/types/gameTypes";
import { gameData } from "src/app/types/gameTypes";

export const getGameData = createAction('[game] get data');
export const getGameDataSuccess = createAction('[game] data success', props<{data: gameData}> ());
export const gameError = createAction('[game] error', props<{error: string}> ());

export const generateChar = createAction('[game] generate char');
export const saveChar = createAction('[game] save char', props<{data: character, form: formEnum}> ());
export const submitChar = createAction('[game] submit char');
export const submitCharSuccess = createAction('[game] submit char success', props<{data: characterCalculations}> ());