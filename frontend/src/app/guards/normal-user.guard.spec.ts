import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { normalUserGuard } from './normal-user.guard';

describe('normalUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => normalUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
