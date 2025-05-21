import { OrderStatusEnum } from '../../../shared/enums/order-status-enum';
import { BeverageProdOrder } from '../../beverage-prod-order/models/beverage-prod-order.model';
import { CoconutWaterProdOrder } from '../../coconutwater-prod-order/models/coconutwater-prod-order.model';
import { Customer } from '../../customer/models/customer.model';
import { PaymentDetails } from '../../payment-details/models/payment-details.model';
import { ShippingPlan } from '../../shipping-plan/models/shipping-plan.model';
import { VinegarProdOrder } from '../../vinegar-prod-order/models/vinegar-prod-order.model';

export interface Order {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  orderDate: string;
  orderStatus: OrderStatusEnum;
  coconutWaterProdOrder?: CoconutWaterProdOrder;
  vinegarProdOrder?: VinegarProdOrder;
  beverageProdOrder?: BeverageProdOrder;
  paymentDetails: PaymentDetails;
  customer: Customer;
  shippingPlan: ShippingPlan;
}
