import { Injectable } from '@angular/core';

/**
 * Service for save JWT token in localStorage
 */
@Injectable()
export class JwtService {

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
