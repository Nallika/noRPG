import { BehaviorSubject, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthComponent } from './auth.component';
import { PlayerService } from '../core/services/player.service';
import { ApiService } from '../core/services/api.service';
import { uniqValidator } from '../core/validators/uniq-validator';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;
  let playerService: PlayerService;
  const routeSubject = new BehaviorSubject([{
    path: 'login'
  }]);

  function resetComponent() {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    playerService = TestBed.inject(PlayerService);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    spyOn(uniqValidator, 'validate').and.returnValue(() => of(null));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AuthComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { url: routeSubject }
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', {
            navigateByUrl: of({}),
          }),
        },
        {
          provide: ApiService,
          useValue: {},
        },
        {
          provide: PlayerService,
          useValue: jasmine.createSpyObj('PlayerService', {
            attemptAuth: of({}),
          }),
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  it('should create', () => {
    resetComponent();
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    routeSubject.next([{path: 'login'}]);
    resetComponent();
  
    const submitButton: HTMLElement = fixture.debugElement.query(By.css('[data-test="submit"]')).nativeElement;
  
    component.authForm.controls.email.setValue('test@email.com');
    component.authForm.controls.password.setValue('test123');
  
    submitButton.click();
  
    expect(playerService.attemptAuth).toHaveBeenCalledWith('login', {
      email: 'test@email.com',
      password: 'test123'
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should register successfully', () => {
    routeSubject.next([{path: 'register'}]);
    resetComponent();

    const submitButton: HTMLElement = fixture.debugElement.query(By.css('[data-test="submit"]')).nativeElement;

    component.authForm.controls.nickname.setValue('test');
    component.authForm.controls.email.setValue('test@email.com');
    component.authForm.controls.password.setValue('test123');

    submitButton.click();
  
    expect(playerService.attemptAuth).toHaveBeenCalledWith('register', {
      nickname: 'test',
      email: 'test@email.com',
      password: 'test123'
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should fail sync validation for invalid email, nickname, and password', () => {
    routeSubject.next([{path: 'register'}]);
    resetComponent();

    component.authForm.controls.nickname.setValue('');
    component.authForm.controls.email.setValue('testinvalid');
    component.authForm.controls.password.setValue('123');
  
    expect(component.authForm.valid).toBe(false);
    expect(component.authForm.controls.nickname.valid).toBe(false);
    expect(component.authForm.controls.email.valid).toBe(false);
    expect(component.authForm.controls.password.valid).toBe(false);
  });

  it('should display an error message when login fails', () => {
    const error = 'Error message';
    routeSubject.next([{ path: 'login' }]);
    resetComponent();
    fixture.detectChanges();

    playerService.attemptAuth = jasmine.createSpy('attemptAuth').and.returnValue(throwError(() => new Error(error)));

    component.authForm.controls.email.setValue('test@email.com');
    component.authForm.controls.password.setValue('test123');

    const submitButton: HTMLElement = fixture.debugElement.query(By.css('[data-test="submit"]')).nativeElement;
    submitButton.click();

    fixture.detectChanges();

    const errorMessage: HTMLElement = fixture.debugElement.query(By.css('[data-test="error"]')).nativeElement;
    expect(errorMessage.textContent!.trim()).toEqual(error);
  });
  
});
