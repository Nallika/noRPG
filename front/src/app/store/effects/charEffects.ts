import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, withLatestFrom, exhaustMap } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { charState } from 'src/app/types/storeTypes';
import { submitChar, submitCharError, submitCharSuccess } from '../actions/charActions';

@Injectable()
export class CharEffects {
  getGameData$ = createEffect(() => this.actions$.pipe(
    ofType(submitChar),
    withLatestFrom(this.store.select('char', 'character')),
    exhaustMap(([_, data]) => {
      return this.apiService.post('/newChar', data).pipe(
        map((data) => submitCharSuccess({data})),
        catchError((error) => of(submitCharError(error.message)))
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<{char: charState}>,
  ) {}
}
