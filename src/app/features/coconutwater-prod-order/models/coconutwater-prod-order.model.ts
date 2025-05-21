import { ProdOrderDetails } from './../../prod-order-details/models/prod-order-details.model';

export interface CoconutWaterProdOrder {
    id?: string;
    version?: number;
    createdDate?: string;
    lastModifiedDate?: string;
    prodOrderDetails: ProdOrderDetails;
  }