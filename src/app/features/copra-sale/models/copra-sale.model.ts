import { Customer } from '../../customer/models/customer.model';
import { PaymentDetails } from '../../payment-details/models/payment-details.model';
import { ShippingPlan } from '../../shipping-plan/models/shipping-plan.model';

export interface CopraSale {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  saleQuantity: number;
  pricePerQuantity: number;
  totalSaleAmount: number;
  saleDate: string;
  customer: Customer;
  shippingPlan: ShippingPlan;
  paymentDetails: PaymentDetails;
}
