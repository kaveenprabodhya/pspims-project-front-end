import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryVehicleListComponent } from './delivery-vehicle-list.component';

describe('DeliveryVehicleListComponent', () => {
  let component: DeliveryVehicleListComponent;
  let fixture: ComponentFixture<DeliveryVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryVehicleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
