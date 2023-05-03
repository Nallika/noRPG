import { createReducer, on } from '@ngrx/store';

import { AuthState } from 'src/app/types/storeTypes';
import { player } from 'src/app/types/generalTypes';

import * as actions from './actions';

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  error: '',
  player: {} as player
};

/**
 * Manage authentication process
 */
export const AuthReducer = createReducer(
  initialState,
  on(actions.login, (state: AuthState) => ({
    ...state,
    loading: true,
  })),
  on(actions.logout, () => ({
    ...initialState,
  })),
  on(actions.register, (state: AuthState) => ({
    ...state,
    loading: true,
  })),
  on(actions.authError, (state: AuthState, action) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error: action.error
  })),
  on(actions.authSuccess, (state: AuthState, action) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    player: action.player,
  })),
)