import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { VehicleTypeEnum } from '../../../../shared/enums/vehicle-type-enum.enum';
import { VehicleAvailabilityStatusEnum } from '../../../../shared/enums/vehicle-availability-status-enum';
import { DeliveryVehicle } from '../../models/delivery-vehicle.model';

@Component({
  selector: 'app-delivery-vehicle-list',
  imports: [TableComponent],
  templateUrl: './delivery-vehicle-list.component.html',
  styleUrl: './delivery-vehicle-list.component.css'
})
export class DeliveryVehicleListComponent {
  deliveryVehicles: DeliveryVehicle[] = [];

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.deliveryVehicles = [
      {
        id: '1',
        vehicleRegNo: 'XYZ123',
        vehicleType: VehicleTypeEnum.TRUCK,
        availabilityStatus: VehicleAvailabilityStatusEnum.AVAILABLE
      },
      {
        id: '2',
        vehicleRegNo: 'ABC456',
        vehicleType: VehicleTypeEnum.VAN,
        availabilityStatus: VehicleAvailabilityStatusEnum.IN_USE
      }
    ];
  }

  onEdit(vehicle: DeliveryVehicle): void {
    console.log('Edit', vehicle);
  }

  onDelete(vehicle: DeliveryVehicle): void {
    console.log('Delete', vehicle);
  }
}
