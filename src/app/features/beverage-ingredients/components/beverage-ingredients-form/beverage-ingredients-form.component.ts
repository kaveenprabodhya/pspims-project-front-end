import { BeverageType } from './../../../beverage-type/models/beverage-type.model';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BeverageIngredients } from '../../models/beverage-ingredients.model';
import { IngredientMeasure } from '../../../../shared/enums/ingredient-measure.enum';

@Component({
  selector: 'app-beverage-ingredients-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './beverage-ingredients-form.component.html',
  styleUrl: './beverage-ingredients-form.component.css'
})
export class BeverageIngredientsFormComponent {
  beverageTypes: BeverageType[] = [];

  ingredient: BeverageIngredients = {
    ingredientName: '',
    measureAmount: 0,
    ingredientMeasure: '' as any,
    beverageType: null as any,
  };

  onSubmit() {}
}
