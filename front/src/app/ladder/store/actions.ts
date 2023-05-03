import { createAction, props } from '@ngrx/store';
import { ladder } from 'src/app/types/ladderTypes';

export const getLadder = createAction('[ladder] get');
export const resetLadder = createAction('[ladder] reset');
export const getLadderError = createAction('[ladder] error', props<{error: string}> ());
export const getLadderSuccess = createAction('[ladder] success', props<{ladder: ladder, isFull: boolean}> ());