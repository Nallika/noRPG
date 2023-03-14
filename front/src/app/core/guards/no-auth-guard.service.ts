import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PlayerService } from '../services/player.service';
import { map ,  take } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard {
  constructor(
    private router: Router,
    private playerService: PlayerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.playerService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));

  }
}
