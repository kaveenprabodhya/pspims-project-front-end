import { ProdOrderDetails } from "../../prod-order-details/models/prod-order-details.model";

export interface VinegarProdOrder {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    prodOrderDetails: ProdOrderDetails;
    fermentationType: 'ALCOHOLIC' | 'ACETIC' | string;
  }