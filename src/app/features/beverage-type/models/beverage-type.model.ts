import { BeverageIngredients } from "../../beverage-ingredients/models/beverage-ingredients.model";
import { BeverageProdOrder } from "../../beverage-prod-order/models/beverage-prod-order.model";

export interface BeverageType {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  beverageName: string;
  beverageDescription: string;
  isActive: boolean;
  nutritionInfo: string;
  beverageIngredients?: BeverageIngredients[];
  beverageProdOrder?: BeverageProdOrder[];
}

