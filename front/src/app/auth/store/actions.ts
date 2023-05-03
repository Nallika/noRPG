import { createAction, props } from '@ngrx/store';
import { loginData, registerData, player } from 'src/app/types/generalTypes';

export const login = createAction('[auth] login', props<{authData: loginData}> ());
export const logout = createAction('[auth] logout');

export const populate = createAction('[auth] populate');
export const authenticatePlayer = createAction('[auth] authenticate', props<{player: player}> ());

export const register = createAction('[auth] register', props<{authData: registerData}> ());

export const authError = createAction('[auth] error', props<{error: string}> ());
export const authSuccess = createAction('[auth] success', props<{player: player}> ());