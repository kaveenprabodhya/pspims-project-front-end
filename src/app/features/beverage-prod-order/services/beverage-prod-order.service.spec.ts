import { TestBed } from '@angular/core/testing';

import { BeverageProdOrderService } from './beverage-prod-order.service';

describe('BeverageProdOrderService', () => {
  let service: BeverageProdOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeverageProdOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
