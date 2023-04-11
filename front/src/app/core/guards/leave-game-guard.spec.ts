import { TestBed } from '@angular/core/testing';

import { LeaveGameGuard } from './leave-game-guard';

describe('LeaveGameGuard', () => {
  let service: LeaveGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveGameGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
