import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PlayerService } from './core/services/player.service';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let playerService: jasmine.SpyObj<PlayerService>;

  beforeEach(() => {
    const playerServiceSpy = jasmine.createSpyObj('PlayerService', ['populate']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: PlayerService, useValue: playerServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    playerService = TestBed.inject(PlayerService) as jasmine.SpyObj<PlayerService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call playerService.populate on init', () => {
    fixture.detectChanges();
    expect(playerService.populate).toHaveBeenCalled();
  });
});
