import { TestBed } from '@angular/core/testing';

import { ProdOrderDetailsService } from './prod-order-details.service';

describe('ProdOrderDetailsService', () => {
  let service: ProdOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdOrderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
