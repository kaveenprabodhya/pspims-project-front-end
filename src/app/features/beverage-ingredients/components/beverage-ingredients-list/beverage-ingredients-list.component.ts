import { Component } from '@angular/core';
import { BeverageIngredients } from '../../models/beverage-ingredients.model';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-beverage-ingredients-list',
  imports: [CommonModule, TableComponent],
  templateUrl: './beverage-ingredients-list.component.html',
  styleUrl: './beverage-ingredients-list.component.css',
})
export class BeverageIngredientsListComponent {
  // beverageIngredients: BeverageIngredients[] = [
  beverageIngredients = [
  {
      ingredientName: 'Sugar',
      measureAmount: 5,
      ingredientMeasure: 'GRAM',
      beverageType: { name: 'Lemon Juice' },
    },
    {
      ingredientName: 'Salt',
      measureAmount: 2,
      ingredientMeasure: 'GRAM',
      beverageType: { name: 'Tomato Juice' },
    },
    {
      ingredientName: 'Honey',
      measureAmount: 10,
      ingredientMeasure: 'ML',
      beverageType: { name: 'Ginger Tea' },
    },
    {
      ingredientName: 'Mint Leaves',
      measureAmount: 3,
      ingredientMeasure: 'LEAVES',
      beverageType: { name: 'Mint Cooler' },
    },
  ];

  onEdit(ingredient: any) {
  }
  
  onDelete(ingredient: any) {
    
  }
}
