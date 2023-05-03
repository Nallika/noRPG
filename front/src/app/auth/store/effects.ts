import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import * as actions from './actions';
import { authData, player } from 'src/app/types/generalTypes';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  authenticatePlayer$ = createEffect(() => this.actions$.pipe(
    ofType(actions.authenticatePlayer),
    mergeMap(({player}) => {
      this.jwtService.saveToken(player.token);
      this.router.navigateByUrl('/');
      return of(actions.authSuccess({player}));
    })
  ));

  logoutPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(actions.logout),
    mergeMap(() => {
      this.jwtService.destroyToken();
      this.router.navigateByUrl('/');
      return of(actions.authError({error: ''}))
    })
  ));

  loginPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(actions.login),
    mergeMap(({authData}) => {
      return this.apiService.post<authData, player>('/login', authData).pipe(
        map((data) => actions.authenticatePlayer({player: data})),
        catchError((error) => of(actions.authError({error})))
      )
    })
  ));

  registerNewPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(actions.register),
    mergeMap(({authData}) => {
      return this.apiService.post<authData, player>('/register', authData).pipe(
        map((data) => actions.authenticatePlayer({player: data})),
        catchError((error) => of(actions.authError({error})))
      )
    })
  ));

  populatePlayer$ = createEffect(() => this.actions$.pipe(
    ofType(actions.populate),
    mergeMap(() => {
      if (this.jwtService.getToken()) {
        return this.apiService.get<player>('/player').pipe(
          map((data) => actions.authenticatePlayer({player: data})),
          catchError(() => of(actions.logout()))
        )
      } else {
        return of(actions.logout());
      }
    })
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router,
  ) {}
}
