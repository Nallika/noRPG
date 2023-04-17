import { TestBed } from '@angular/core/testing';
import { NewCharPageComponent } from 'src/app/game/pages/new-char-page/new-char-page.component';
import { LeaveGameGuard } from './leave-game-guard';

describe('LeaveGameGuard', () => {
  let guard: LeaveGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveGameGuard]
    });
    guard = TestBed.inject(LeaveGameGuard);
  });

  it('should return component.canExit() result', () => {
    const component = jasmine.createSpyObj<NewCharPageComponent>('NewCharPageComponent', ['canExit']);
    component.canExit.and.returnValue(true);

    expect(guard.canDeactivate(component)).toEqual(true);
    expect(component.canExit).toHaveBeenCalled();
  });
});
