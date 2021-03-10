import { TestBed } from '@angular/core/testing';

import { RadicalService } from './radical.service.service';

describe('RadicalService', () => {
  let service: RadicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
