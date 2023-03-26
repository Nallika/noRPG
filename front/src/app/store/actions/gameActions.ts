import { createAction, props } from "@ngrx/store";

import { gameData } from "../../types/generalTypes";

export const getGameData = createAction('[GAME] get data');
export const getGameDataSuccess = createAction('[GAME] data success', props<{data: gameData}> ());
export const getGameDataError = createAction('[GAME] data error', props<{error: string}> ());