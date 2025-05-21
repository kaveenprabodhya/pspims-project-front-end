import { PaymentMethodEnum } from '../../../shared/enums/payment-method-enum';
import { PaymentStatusEnum } from '../../../shared/enums/payment-status-enum';

export interface PaymentDetails {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  paymentStatus: PaymentStatusEnum;
  paymentDate: string;
  paymentAmount: number;
  invoiceNo: string;
  paymentMethod: PaymentMethodEnum;
}
