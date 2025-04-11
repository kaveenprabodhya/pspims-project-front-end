import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryVehiclePageComponent } from './delivery-vehicle-page.component';

describe('DeliveryVehiclePageComponent', () => {
  let component: DeliveryVehiclePageComponent;
  let fixture: ComponentFixture<DeliveryVehiclePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryVehiclePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryVehiclePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
