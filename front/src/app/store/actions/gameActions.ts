import { createAction, props } from "@ngrx/store";

import { character, fullCharacter } from "src/app/types/gameTypes";
import { gameData } from "../../types/generalTypes";

export const getGameData = createAction('[game] get data');
export const getGameDataSuccess = createAction('[game] data success', props<{data: gameData}> ());
export const getGameDataError = createAction('[game] data error', props<{error: string}> ());

export const generateChar = createAction('[game] generate char');
export const saveChar = createAction('[game] save char', props<{data: character}> ());
export const submitChar = createAction('[game] submit char');
export const submitCharError = createAction('[game] submit char error', props<{error: string}> ());
export const submitCharSuccess = createAction('[game] submit char success', props<{data: fullCharacter}> ());