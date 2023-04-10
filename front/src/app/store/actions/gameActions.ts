import { createAction, props } from "@ngrx/store";

import { character, fullCharacter, formEnum } from "src/app/types/gameTypes";
import { gameData } from "src/app/types/gameTypes";
import { ladder } from "src/app/types/ladderTypes";

export const getGameData = createAction('[game] get data');
export const getGameDataSuccess = createAction('[game] get data success', props<{data: gameData}> ());
export const gameError = createAction('[game] error', props<{error: string}> ());

export const getLadder = createAction('[game] get ladder');
export const getLadderSuccess = createAction('[game] get ladder success', props<{ladder: ladder, isFull: boolean}> ());

export const resetPoints = createAction('[game] reset points');
export const generateChar = createAction('[game] generate char');
export const saveChar = createAction('[game] save char', props<{data: character, form: formEnum}> ());
export const submitChar = createAction('[game] submit char');
export const submitCharSuccess = createAction('[game] submit char success', props<{data: {character: fullCharacter, score: number}}> ());