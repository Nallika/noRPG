import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import * as actions from './actions';
import { AppState } from 'src/app/types/storeTypes';
import { ladder } from 'src/app/types/ladderTypes';



@Injectable()
export class LadderEffects {

  /**
   * Get ladder (chars crore list)
   */
  getLadder$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getLadder),
    withLatestFrom(this.store.select('ladder', 'page')),
    exhaustMap(([_, page]) => {
      return this.apiService.get<{ladder: ladder, isFull: boolean}>(`/ladder?page=${page}`).pipe(
        map((data) => actions.getLadderSuccess(data)),
        catchError((error) => of(actions.getLadderError(error.message)))
      )
    })
  ));
  
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>,
  ) {}
}
