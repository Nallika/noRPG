import { createReducer, on } from '@ngrx/store';

import * as actions from './actions';
import { LadderState } from '../../types/storeTypes';

const initialState: LadderState = {
  loading: false,
  error: '',
  ladderChunk: [],
  page: 0,
  isFull: false
};

/**
 * Manage authentication process
 */
export const LadderReducer = createReducer(
  initialState,
  on(actions.getLadderError, (state: LadderState, action) => ({
    ...state,
    loading: false,
    error: action.error
  })),
  on(actions.getLadder, (state: LadderState) => ({
    ...state,
    loading: true,
    page: state.page + 1
  })),
  on(actions.resetLadder, () => ({
    ...initialState,
  })),
  on(actions.getLadderSuccess, (state: LadderState, action) => ({
    ...state,
    loading: false,
    ladderChunk: action.ladder,
    isFull: action.isFull
  })),
)