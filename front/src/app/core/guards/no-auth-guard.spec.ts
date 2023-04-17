import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { NoAuthGuard } from './no-auth-guard';
import { PlayerService } from '../services/player.service';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;
  let router: Router;
  let playerService: PlayerService;
  const isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        NoAuthGuard,
        {
          provide: PlayerService,
          useValue: {
            isAuthenticated: isAuthenticatedSubject.asObservable()
          }
        }
      ]
    });

    guard = TestBed.inject(NoAuthGuard);
    router = TestBed.inject(Router);
    playerService = TestBed.inject(PlayerService);
  });

  it('should allow access to non-authenticated user', (done) => {
    isAuthenticatedSubject.next(false);

    guard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBeTrue();
      done();
    });
  });

  it('should redirect authenticated user to home page', (done) => {
    isAuthenticatedSubject.next(true);

    spyOn(router, 'navigateByUrl');

    guard.canActivate().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      done();
    });
  });
});
