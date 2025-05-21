import { InventoryItemTypeEnum } from '../../../shared/enums/inventory-item-type-enum';
import { InventoryQuantityTypeEnum } from '../../../shared/enums/inventory-quantity-type-enum';
import { CoconutPurchase } from '../../coconut-purchase/models/coconut-purchase.model';

export interface Inventory {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  inventoryItemType: InventoryItemTypeEnum;
  inventoryQuantity: number;
  inventoryQuantityType: InventoryQuantityTypeEnum;
  minimumStockLevel: number;
  maximumStockLevel: number;
  coconutPurchase?: CoconutPurchase[];
}
