import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeliveryVehicle } from '../models/delivery-vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryVehicleService {
  private selectedVehicle = new BehaviorSubject<DeliveryVehicle | null>(null);
  selectedVehicle$ = this.selectedVehicle.asObservable();

  constructor() {}

  setSelectedVehicle(vehicle: DeliveryVehicle) {
    this.selectedVehicle.next(vehicle);
  }

  clearSelectedVehicle() {
    this.selectedVehicle.next(null);
  }
}
