import { Component } from '@angular/core';
import { BeverageIngredients } from '../../models/beverage-ingredients.model';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BeverageIngredientsService } from '../../services/beverage-ingredients.service';
import { Router } from '@angular/router';
import { BeverageType } from '../../../beverage-type/models/beverage-type.model';
import { IngredientMeasure } from '../../../../shared/enums/ingredient-measure.enum';

@Component({
  selector: 'app-beverage-ingredients-list',
  imports: [CommonModule, TableComponent],
  templateUrl: './beverage-ingredients-list.component.html',
  styleUrl: './beverage-ingredients-list.component.css',
})
export class BeverageIngredientsListComponent {
  beverageIngredients: BeverageIngredients[] = [
    {
      id: '123',
      ingredientName: 'Sugar',
      measureAmount: 5,
      ingredientMeasure: IngredientMeasure.GRAM,
      beverageType: { id: 'asdfg', beverageName: 'Lemon Juice' } as BeverageType,
    },
  ];

  constructor(
    private router: Router,
    private ingredientService: BeverageIngredientsService
  ) {}

  onEdit(ingredient: any) {
    this.ingredientService.setSelectedIngredient(ingredient);
    this.router.navigate(['/admin/dashboard/beverage-ingredients/form', ingredient.id]);
  }

  onDelete(ingredient: any) {}
}
