import { VehicleAvailabilityStatusEnum } from '../../../shared/enums/vehicle-availability-status-enum';
import { VehicleTypeEnum } from '../../../shared/enums/vehicle-type-enum.enum';

export interface DeliveryVehicle {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  vehicleRegNo: string;
  vehicleType: VehicleTypeEnum;
  availabilityStatus: VehicleAvailabilityStatusEnum;
}
