import { TestBed } from '@angular/core/testing';

import { ShippingPlanService } from './shipping-plan.service';

describe('ShippingPlanService', () => {
  let service: ShippingPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
