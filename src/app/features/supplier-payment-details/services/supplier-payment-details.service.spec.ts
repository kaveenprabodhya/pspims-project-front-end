import { TestBed } from '@angular/core/testing';

import { SupplierPaymentDetailsService } from './supplier-payment-details.service';

describe('SupplierPaymentDetailsService', () => {
  let service: SupplierPaymentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierPaymentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
