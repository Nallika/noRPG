import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { getGameData, getGameDataSuccess, getGameDataError } from '../actions/gameActions';

@Injectable()
export class GameEffects {
  getGameData$ = createEffect(() => this.actions$.pipe(
    ofType(getGameData),
    mergeMap(() => {
      return this.apiService.get('/gameData').pipe(
        map((data) => getGameDataSuccess({data})),
        catchError((error) => of(getGameDataError(error.message)))
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}
}
