import { PaymentDetails } from '../../payment-details/models/payment-details.model';
import { Supplier } from '../../supplier/models/supplier.model';

export interface SupplierPaymentDetails {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  paymentDetails: PaymentDetails;
  supplier: Supplier;
}
