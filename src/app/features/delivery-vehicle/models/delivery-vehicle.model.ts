export interface DeliveryVehicle {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    vehicleRegNo: string;
    vehicleType: string; // VehicleTypeEnum
    availabilityStatus: string; // VehicleAvailabilityStatusEnum
  }