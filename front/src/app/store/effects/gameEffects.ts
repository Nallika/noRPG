import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, withLatestFrom, exhaustMap, mergeMap } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import * as gameActions from '../actions/gameActions';
import { gameState } from 'src/app/types/storeTypes';
import { character, fullCharacter, gameData } from 'src/app/types/gameTypes';
import { ladder } from 'src/app/types/ladderTypes';

@Injectable()
export class GameEffects {
  /**
   * Get base game data and store it in state
   */
  getGameData$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.getGameData),
    mergeMap(() => {
      return this.apiService.get<gameData>('/gameData').pipe(
        map((data) => gameActions.getGameDataSuccess({data})),
        catchError((error) => of(gameActions.gameError(error.message)))
      )
    })
  ));

  /**
   * Get ladder (chars crore list)
   */
  getLadder$ = createEffect(() => this.actions$.pipe(
    ofType(gameActions.getLadder),
    withLatestFrom(this.store.select('game', 'ladderData', 'page')),
    exhaustMap(([_, page]) => {
      return this.apiService.get<{ladder: ladder, isFull: boolean}>(`/ladder?page=${page}`).pipe(
        map((data) => gameActions.getLadderSuccess(data)),
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
      return this.apiService.post<character, {character: fullCharacter, score: number}>('/newChar', data).pipe(
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
