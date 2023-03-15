import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PlayerService } from '../services/player.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard  {
  constructor(
    private router: Router,
    private playerService: PlayerService
  ) {}

  canActivate(): Observable<boolean> {

    return this.playerService.isAuthenticated.pipe(take(1), map((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/');
        return false;
      }

      return true;
    }));
  }
}