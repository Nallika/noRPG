import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlayerService } from './player.service';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { of } from 'rxjs';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpTestingController: HttpTestingController;
  let jwtService: JwtService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PlayerService,
        ApiService,
        JwtService,
      ],
    });

    service = TestBed.inject(PlayerService);
    httpTestingController = TestBed.inject(HttpTestingController);
    jwtService = TestBed.inject(JwtService);
    apiService = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set auth with a valid player', () => {
    const testPlayer = {
      id: 1,
      email: 'test@example.com',
      nickname: 'test',
      token: 'test-token',
    };

    spyOn(jwtService, 'saveToken').and.callThrough();

    service.setAuth(testPlayer);

    expect(jwtService.saveToken).toHaveBeenCalledWith(testPlayer.token);

    service.currentPlayer.subscribe(player => {
      expect(player).toEqual(testPlayer);
    });
    
    service.isAuthenticated.subscribe(isAuth => {
      expect(isAuth).toBeTrue();
    });
  });

  it('should log out the user', () => {
    spyOn(jwtService, 'destroyToken').and.callThrough();

    service.logout();

    expect(jwtService.destroyToken).toHaveBeenCalled();

    service.currentPlayer.subscribe(player => {
      expect(player).toEqual({} as any);
    });
    
    service.isAuthenticated.subscribe(isAuth => {
      expect(isAuth).toBeFalse();
    });
  });

  it('should attempt auth and succeed', () => {
    const testPlayer = {
      id: 1,
      email: 'test@example.com',
      nickname: 'test',
      token: 'test-token',
    };

    const authData = {
      email: 'test@example.com',
      password: 'test123',
    };

    spyOn(apiService, 'post').and.returnValue(of(testPlayer));

    service.attemptAuth('login', authData).subscribe((player) => {
      expect(player).toEqual(testPlayer);

      service.currentPlayer.subscribe(player => {
        expect(player).toEqual(testPlayer);
      });
      
      service.isAuthenticated.subscribe(isAuth => {
        expect(isAuth).toBeTrue();
      });
    });

    expect(apiService.post).toHaveBeenCalledWith('/login', authData);
  });
});
