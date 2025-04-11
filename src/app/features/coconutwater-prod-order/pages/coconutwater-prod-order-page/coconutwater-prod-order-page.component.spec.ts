import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoconutwaterProdOrderPageComponent } from './coconutwater-prod-order-page.component';

describe('CoconutwaterProdOrderPageComponent', () => {
  let component: CoconutwaterProdOrderPageComponent;
  let fixture: ComponentFixture<CoconutwaterProdOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoconutwaterProdOrderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoconutwaterProdOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
