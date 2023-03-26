import { createAction, props } from "@ngrx/store";

import { charSubmitResponce, saveFormParams } from "src/app/types/gameTypes";

export const saveChar = createAction('[CHAR] save char', props<{data: saveFormParams}> ());
export const submitChar = createAction('[CHAR] submit char');
export const submitCharError = createAction('[CHAR] submit char error', props<{error: string}> ());
export const submitCharSuccess = createAction('[CHAR] submit char success', props<{data: charSubmitResponce}> ());
