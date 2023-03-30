import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, withLatestFrom, exhaustMap, mergeMap } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import * as gameActions from '../actions/gameActions';
import { gameState } from 'src/app/types/storeTypes';

@Injectable()
export class GameEffects {
  /**
   * Get base game data and store it in state
   */
  getGameData$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.getGameData),
    mergeMap(() => {
      return this.apiService.get('/gameData').pipe(
        map((data) => gameActions.getGameDataSuccess({data})),
        catchError((error) => of(gameActions.gameError(error.message)))
      )
    })
  ));

  /**
   * Submit created character to server, receve character info and store it
   */
  submitChar$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.submitChar),
    withLatestFrom(this.store.select('game', 'character')),
    exhaustMap(([_, data]) => {
      return this.apiService.post('/newChar', data).pipe(
        map((data) => gameActions.submitCharSuccess({data})),
        catchError((error) => of(gameActions.gameError(error.message)))
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<{game: gameState}>,
  ) {}
}
