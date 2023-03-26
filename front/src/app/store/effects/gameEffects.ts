import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, withLatestFrom, exhaustMap, mergeMap } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import * as gameActions from '../actions/gameActions';
import { gameState } from 'src/app/types/storeTypes';

@Injectable()
export class GameEffects {
  getGameData$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.getGameData),
    mergeMap(() => {
      return this.apiService.get('/gameData').pipe(
        map((data) => gameActions.getGameDataSuccess({data})),
        catchError((error) => of(gameActions.getGameDataError(error.message)))
      )
    })
  ));

  submitChar$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.submitChar),
    withLatestFrom(this.store.select('game', 'charData', 'character')),
    exhaustMap(([_, data]) => {
      return this.apiService.post('/newChar', data).pipe(
        map((data) => gameActions.submitCharSuccess({data})),
        catchError((error) => of(gameActions.submitCharError(error.message)))
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<{game: gameState}>,
  ) {}
}
