import { TestBed } from '@angular/core/testing';

import { CoconutPurchaseService } from './coconut-purchase.service';

describe('CoconutPurchaseService', () => {
  let service: CoconutPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoconutPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
