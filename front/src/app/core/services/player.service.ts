import { Injectable } from '@angular/core';

import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { player, authType, authData } from '../../types';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class PlayerService {
  private currentPlayerSubject = new BehaviorSubject<player>({} as player);
  public currentPlayer = this.currentPlayerSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,

    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load player's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store player's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/player')
      .subscribe({
        next: (data) => this.setAuth(data),
        error: () => this.purgeAuth()
      });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(player: player) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(player.token);
    // Set current player data into observable
    this.currentPlayerSubject.next(player);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    console.log('purgeAuth');
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current player to an empty object
    this.currentPlayerSubject.next({} as player);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: authType, authData: authData): Observable<player> {
    const route = (type === 'login') ? '/login' : '/register';

    return this.apiService.post(route, authData)
      .pipe(
        map(
          data => {
            this.setAuth(data);
            return data;
          }
        )
      );
  }

  getCurrentPlayer(): player {
    return this.currentPlayerSubject.value;
  }
}
