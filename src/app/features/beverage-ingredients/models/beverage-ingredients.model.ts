import { IngredientMeasure } from '../../../shared/enums/ingredient-measure.enum';
import { BeverageType } from '../../beverage-type/models/beverage-type.model';

export interface BeverageIngredients {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  ingredientName: string;
  measureAmount: number;
  ingredientMeasure: IngredientMeasure; 
  beverageType: BeverageType;
}
