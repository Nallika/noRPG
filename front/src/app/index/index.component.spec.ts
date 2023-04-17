import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';

import { IndexComponent } from './index.component';
import { PlayerService } from '../core/services/player.service';


describe('IndexComponent', () => {
  let router: Router;
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  const isAuthenticated = new BehaviorSubject(true);
  const playerServiceMock = jasmine.createSpyObj('PlayerService', [], { isAuthenticated: isAuthenticated.asObservable() });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', {
            navigateByUrl: of({}),
          }),
        },
        {
          provide: PlayerService,
          useValue: playerServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render buttons for authenticated', () => {
    isAuthenticated.next(true);
    fixture.detectChanges();

    const newGame = fixture.debugElement.queryAll(By.css('[data-test="new-game"]'));
    const ladder = fixture.debugElement.queryAll(By.css('[data-test="ladder"]'));
    const login = fixture.debugElement.queryAll(By.css('[data-test="login"]'));
    const register = fixture.debugElement.queryAll(By.css('[data-test="register"]'));
    expect(newGame.length).toBe(1);
    expect(ladder.length).toBe(1);
    expect(login.length).toBe(0);
    expect(register.length).toBe(0);
  });

  it('should render buttons for non-authenticated', () => {
    isAuthenticated.next(false);
    fixture.detectChanges();

    const newGame = fixture.debugElement.queryAll(By.css('[data-test="new-game"]'));
    const ladder = fixture.debugElement.queryAll(By.css('[data-test="ladder"]'));
    const login = fixture.debugElement.queryAll(By.css('[data-test="login"]'));
    const register = fixture.debugElement.queryAll(By.css('[data-test="register"]'));
    expect(newGame.length).toBe(0);
    expect(ladder.length).toBe(1); 
    expect(login.length).toBe(1);
    expect(register.length).toBe(1);
  });

  it('should navigate correctly', () => {
    const ladder: HTMLElement = fixture.debugElement.query(By.css('[data-test="ladder"]')).nativeElement;
   
    ladder.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/ladder')
  });
});
