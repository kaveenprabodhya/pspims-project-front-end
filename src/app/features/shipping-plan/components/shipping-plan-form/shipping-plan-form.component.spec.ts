import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPlanFormComponent } from './shipping-plan-form.component';

describe('ShippingPlanFormComponent', () => {
  let component: ShippingPlanFormComponent;
  let fixture: ComponentFixture<ShippingPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingPlanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
