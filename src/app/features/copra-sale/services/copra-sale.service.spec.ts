import { TestBed } from '@angular/core/testing';

import { CopraSaleService } from './copra-sale.service';

describe('CopraSaleService', () => {
  let service: CopraSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopraSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
