import { ProdStatusEnum } from '../../../shared/enums/prod-status-enum';
import { ProductionQuantityMeasureEnum } from '../../../shared/enums/production-quantity-measure-enum';

export interface ProdOrderDetails {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  prodDate: string;
  prodQuantity: number;
  pricePerUnit: number;
  totalAmount: number;
  productionQuantityMeasure: ProductionQuantityMeasureEnum;
  prodStatus: ProdStatusEnum;
}
