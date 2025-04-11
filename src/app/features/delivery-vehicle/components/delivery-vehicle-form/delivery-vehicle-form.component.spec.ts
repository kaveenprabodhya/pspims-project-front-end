import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryVehicleFormComponent } from './delivery-vehicle-form.component';

describe('DeliveryVehicleFormComponent', () => {
  let component: DeliveryVehicleFormComponent;
  let fixture: ComponentFixture<DeliveryVehicleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryVehicleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
