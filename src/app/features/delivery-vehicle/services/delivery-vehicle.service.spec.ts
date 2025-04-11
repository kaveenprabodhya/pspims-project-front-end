import { TestBed } from '@angular/core/testing';

import { DeliveryVehicleService } from './delivery-vehicle.service';

describe('DeliveryVehicleService', () => {
  let service: DeliveryVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
