import { TestBed } from '@angular/core/testing';

import { BeverageIngredientsService } from './beverage-ingredients.service';

describe('BeverageIngredientsService', () => {
  let service: BeverageIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeverageIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
