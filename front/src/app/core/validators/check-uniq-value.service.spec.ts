import { TestBed } from '@angular/core/testing';

import { CheckUniqValueService } from './check-uniq-value.service';

describe('CheckUniqValueService', () => {
  let service: CheckUniqValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUniqValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
