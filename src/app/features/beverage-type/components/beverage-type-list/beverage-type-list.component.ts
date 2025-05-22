import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BeverageType } from '../../models/beverage-type.model';
import { Router } from '@angular/router';
import { BeverageTypeService } from '../../services/beverage-type.service';

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
      beverageProdOrder: [{ id: 'bpo-001' }],
    }
  ];

  constructor(
    private router: Router,
    private beverageTypeService: BeverageTypeService
  ) {}
  
  onEdit(type: BeverageType) {
    console.log(type);
    
    this.beverageTypeService.setSelectedBeverageType(type);
    this.router.navigate(['/admin/dashboard/beverage-type/form', type.id]);
  }

  onDelete(item: any) {
  }
}
