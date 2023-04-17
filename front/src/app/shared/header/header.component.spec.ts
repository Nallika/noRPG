import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { PlayerService } from '../../core/services/player.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;

  beforeEach(async () => {
    playerServiceSpy = jasmine.createSpyObj('PlayerService', ['logout'], { currentPlayer: of({ nickname: 'testPlayer' }) });

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: PlayerService, useValue: playerServiceSpy },
        Location,
      ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current player nickname', () => {
    const nickname = fixture.debugElement.query(By.css('[data-test="nickname"]')).nativeElement;
    expect(nickname.textContent.trim()).toBe('testPlayer');
  });

  it('should log out the player when the "Log Out" button is clicked', () => {
    const button = fixture.debugElement.query(By.css('[data-test="logout"]')).nativeElement;

    button.click();
    expect(playerServiceSpy.logout).toHaveBeenCalled();
  });

  it('should navigate back when the back button is clicked', () => {
    const location = TestBed.inject(Location);
    spyOn(location, 'back');

    const button = fixture.debugElement.query(By.css('[data-test="back"]')).nativeElement;

    button.click();
    expect(location.back).toHaveBeenCalled();
  });
});
