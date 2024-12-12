import { TestBed } from '@angular/core/testing';

import { CostumerService } from './customer.service';

describe('CostumerService', () => {
  let service: CostumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
