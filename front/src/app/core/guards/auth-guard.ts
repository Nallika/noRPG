import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { JwtService } from '../services/jwt.service';

/**
 * Guard for pages thar required autenticated user
 */
@Injectable()
export class AuthGuard  {
  constructor(
    private router: Router,
    private jwtService: JwtService
  ) {}
  
  canActivate(): Observable<boolean> {
    return this.jwtService.isTokenExits$.pipe(map((isTokenExits) => {
      if (!isTokenExits) {
        this.router.navigateByUrl('/');
        return false;
      }

      return true;
    }));
  }
}