import { CoconutPurchase } from "../../coconut-purchase/models/coconut-purchase.model";

export interface Inventory {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    inventoryItemType: 'RAW_COCONUT' | 'COPRA' | string;
    inventoryQuantity: number;
    inventoryQuantityType: 'KILOGRAM' | 'LITRE' | string;
    minimumStockLevel: number;
    maximumStockLevel: number;
    coconutPurchase: CoconutPurchase[];
  }