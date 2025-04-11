import { TestBed } from '@angular/core/testing';

import { VinegarProdOrderService } from './vinegar-prod-order.service';

describe('VinegarProdOrderService', () => {
  let service: VinegarProdOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinegarProdOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
