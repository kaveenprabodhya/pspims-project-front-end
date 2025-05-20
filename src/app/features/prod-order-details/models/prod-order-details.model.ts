export interface ProdOrderDetails {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    prodDate: string;
    prodQuantity: number;
    pricePerUnit: number;
    totalAmount: number;
    productionQuantityMeasure: 'LITERS' | 'KILOGRAMS' | string;
    prodStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | string;
    batchNumber: string;
  }