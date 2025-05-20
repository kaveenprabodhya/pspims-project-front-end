import { Component } from '@angular/core';
import { BeverageType } from '../../models/beverage-type.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beverage-type-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './beverage-type-form.component.html',
  styleUrl: './beverage-type-form.component.css'
})
export class BeverageTypeFormComponent {
  beverageType: BeverageType = {
    beverageName: '',
    beverageDescription: '',
    isActive: false,
    nutritionInfo: '',
    beverageIngredients: [],
    beverageProdOrder: []
  };

  onSubmit() {}
}
