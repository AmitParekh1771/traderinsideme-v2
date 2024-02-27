import { TestBed } from '@angular/core/testing';

import { BreakpointCheckerService } from './breakpoint-checker.service';

describe('BreakpointCheckerService', () => {
  let service: BreakpointCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
