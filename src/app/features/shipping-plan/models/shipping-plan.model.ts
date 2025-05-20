import { DeliveryVehicle } from "../../delivery-vehicle/models/delivery-vehicle.model";

export interface ShippingPlan {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    shippingAddress: string;
    shippingDate: string;
    trackingNumber: string;
    shippingType: string; // ShippingTypeEnum
    shippingStatus: string; // ShippingStatusEnum
    deliveryType: string; // DeliveryTypeEnum
    deliveryVehicle: DeliveryVehicle;
  }