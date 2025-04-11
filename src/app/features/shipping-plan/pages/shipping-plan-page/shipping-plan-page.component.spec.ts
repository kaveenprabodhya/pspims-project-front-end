import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPlanPageComponent } from './shipping-plan-page.component';

describe('ShippingPlanPageComponent', () => {
  let component: ShippingPlanPageComponent;
  let fixture: ComponentFixture<ShippingPlanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingPlanPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
