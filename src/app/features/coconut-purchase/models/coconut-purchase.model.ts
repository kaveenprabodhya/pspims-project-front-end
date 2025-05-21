import { CoconutQualityGrade } from '../../../shared/enums/coconut-quality-grade.enum';
import { Inventory } from '../../inventory/models/inventory.model';
import { Supplier } from '../../supplier/models/supplier.model';

export interface CoconutPurchase {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  purchaseQuantity: number;
  pricePerUnit: number;
  totalPurchaseCost?: number;
  purchaseDate: string;
  coconutQualityGrade: CoconutQualityGrade;
  inventory: Inventory;
  supplier: Supplier;
}
