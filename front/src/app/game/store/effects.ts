import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, withLatestFrom, exhaustMap } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import * as actions from './actions';
import { AppState } from 'src/app/types/storeTypes';
import { character, resultCharacter, gameData } from 'src/app/types/gameTypes';

@Injectable()
export class GameEffects {
  /**
   * Get base game data and store it in state
   */
  getGameData$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getGameData),
    withLatestFrom(this.store.select('game', 'gameData')),
    exhaustMap(([_, gameData]) => {
      // If we already have loaded gameData use it
      if (gameData.armor && gameData.races && gameData.weapons) {
        return of(actions.getGameDataSuccess({data: gameData}));
      }

      return this.apiService.get<gameData>('/gameData').pipe(
        map((data) => actions.getGameDataSuccess({data})),
        catchError((error) => of(actions.gameError(error.message)))
      )
    })
  ));

  /**
   * Submit created character to server, receve character info and store it
   */
  submitChar$ = createEffect(() => this.actions$.pipe(
    ofType(actions.submitChar),
    withLatestFrom(this.store.select('game', 'character')),
    exhaustMap(([_, data]) => {
      return this.apiService.post<character, {character: resultCharacter, score: number}>('/newChar', data).pipe(
        map((data) => actions.submitCharSuccess({data})),
        catchError((error) => of(actions.gameError(error.message)))
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>,
  ) {}
}
