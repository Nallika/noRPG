import { Injectable } from '@angular/core';

import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { player, authType, authData } from '../../types/generalTypes';
import { map } from 'rxjs/operators';

/**
 * Servise used for authenticate player
 */
@Injectable()
export class PlayerService {
  private currentPlayerSubject = new BehaviorSubject<player>({} as player);
  public currentPlayer = this.currentPlayerSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  /**
   * Autenticate player, if we have token, this runs on app start
   */
  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/player')
      .subscribe({
        next: (data) => this.setAuth(data),
        // If token isn't valid clear it
        error: () => this.logout()
      });
    } else {
      this.logout();
    }
  }

  /**
   * Save token and set current player to currentPlayerSubject
   */
  setAuth(player: player) {
    this.jwtService.saveToken(player.token);
    this.currentPlayerSubject.next(player);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Remove JWT from localstorage
   * Set current player to an empty object
   * Set auth status to false
   */
  logout() {
    this.jwtService.destroyToken(); 
    this.currentPlayerSubject.next({} as player);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Register or login character.
   */
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
}
