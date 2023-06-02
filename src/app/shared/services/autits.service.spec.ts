import { TestBed } from '@angular/core/testing';

import { AutitsService } from './autits.service';

describe('AutitsService', () => {
  let service: AutitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
