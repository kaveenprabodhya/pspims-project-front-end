export interface PaymentDetails {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    paymentStatus: 'PAID' | 'PENDING' | 'FAILED' | string;
    paymentDate: string;
    paymentAmount: number;
    invoiceNo: string;
    paymentMethod: 'CASH' | 'CARD' | 'ONLINE' | string;
  }
  