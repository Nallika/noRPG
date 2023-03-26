import { Injectable } from '@angular/core';

import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { player, authType, authData } from '../../types/generalTypes';
import { map } from 'rxjs/operators';


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
        error: () => this.logout()
      });
    } else {
      this.logout();
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

  logout() {
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
}
