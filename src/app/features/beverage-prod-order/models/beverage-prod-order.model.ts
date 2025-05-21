import { BeverageType } from '../../beverage-type/models/beverage-type.model';
import { ProdOrderDetails } from '../../prod-order-details/models/prod-order-details.model';

export interface BeverageProdOrder {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  prodOrderDetails: ProdOrderDetails;
  beverageType: BeverageType;
}
