import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service for save JWT token in localStorage
 */
@Injectable()
export class JwtService {

  private isTokenExits = new BehaviorSubject<boolean>(!!this.getToken());
  public isTokenExits$ = this.isTokenExits.asObservable();

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
    this.isTokenExits.next(true);
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    this.isTokenExits.next(false);
  }
}
