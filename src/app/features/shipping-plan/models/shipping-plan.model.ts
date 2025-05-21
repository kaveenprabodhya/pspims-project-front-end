import { DeliveryTypeEnum } from '../../../shared/enums/delivery-type-enum';
import { ShippingStatusEnum } from '../../../shared/enums/shipping-status-enum';
import { ShippingTypeEnum } from '../../../shared/enums/shipping-type-enum';
import { DeliveryVehicle } from '../../delivery-vehicle/models/delivery-vehicle.model';

export interface ShippingPlan {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  shippingAddress: string;
  shippingDate: string;
  trackingNumber: string;
  shippingType: ShippingTypeEnum;
  shippingStatus: ShippingStatusEnum;
  deliveryType: DeliveryTypeEnum;
  deliveryVehicle?: DeliveryVehicle;
}
