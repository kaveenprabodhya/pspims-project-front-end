import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPlanListComponent } from './shipping-plan-list.component';

describe('ShippingPlanListComponent', () => {
  let component: ShippingPlanListComponent;
  let fixture: ComponentFixture<ShippingPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingPlanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
