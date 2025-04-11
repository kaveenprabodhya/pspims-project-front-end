import { TestBed } from '@angular/core/testing';

import { CoconutwaterProdOrderService } from './coconutwater-prod-order.service';

describe('CoconutwaterProdOrderService', () => {
  let service: CoconutwaterProdOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoconutwaterProdOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
