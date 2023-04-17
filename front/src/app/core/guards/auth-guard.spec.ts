import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth-guard';
import { PlayerService } from '../services/player.service';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let playerService: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: PlayerService,
          useValue: {
            isAuthenticated: of(false)
          }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    playerService = TestBed.inject(PlayerService);
  });

  it('should navigate to home page and return false if player is not authenticated', () => {
    spyOn(router, 'navigateByUrl');
    const canActivateResult: Observable<boolean> = guard.canActivate();

    canActivateResult.pipe(take(1)).subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });

  it('should return true if player is authenticated', () => {
    spyOn(playerService.isAuthenticated, 'pipe').and.returnValue(of(true));
    const canActivateResult: Observable<boolean> = guard.canActivate();

    canActivateResult.pipe(take(1)).subscribe((result) => {
      expect(result).toBeTrue();
    });
  });
});
