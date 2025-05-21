import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';

@Component({
  selector: 'app-beverage-type-list',
  imports: [TableComponent],
  templateUrl: './beverage-type-list.component.html',
  styleUrl: './beverage-type-list.component.css',
})
export class BeverageTypeListComponent {
  beverageTypes = [
    {
      id: 'bt-001',
      beverageName: 'Lemon Juice',
      beverageDescription: 'Freshly squeezed lemon juice with sugar.',
      isActive: true,
      nutritionInfo: 'Calories: 120, Sugar: 25g',
      beverageIngredients: [
        {
          ingredientName: 'Lemon',
          measureAmount: 100,
          ingredientMeasure: 'ML',
        },
        {
          ingredientName: 'Sugar',
          measureAmount: 20,
          ingredientMeasure: 'GRAM',
        },
      ],
      beverageProdOrder: [{ id: 'bpo-001' }, { id: 'bpo-002' }],
    },
    {
      id: 'bt-002',
      beverageName: 'Coconut Water',
      beverageDescription: 'Pure natural coconut water.',
      isActive: true,
      nutritionInfo: 'Calories: 60, Sugar: 10g',
      beverageIngredients: [
        {
          ingredientName: 'Coconut Water',
          measureAmount: 200,
          ingredientMeasure: 'ML',
        },
      ],
      beverageProdOrder: [{ id: 'bpo-003' }],
    },
    {
      id: 'bt-003',
      beverageName: 'Ginger Ale',
      beverageDescription: 'Sparkling ginger-flavored soft drink.',
      isActive: false,
      nutritionInfo: 'Calories: 150, Sugar: 35g',
      beverageIngredients: [
        {
          ingredientName: 'Ginger',
          measureAmount: 15,
          ingredientMeasure: 'GRAM',
        },
        {
          ingredientName: 'Carbonated Water',
          measureAmount: 250,
          ingredientMeasure: 'ML',
        },
      ],
      beverageProdOrder: [],
    },
  ];
  
  onEdit(item: any) {
    console.log('Edit:', item);
  }

  onDelete(item: any) {
  }
}
