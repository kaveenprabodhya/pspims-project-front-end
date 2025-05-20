import { Component } from '@angular/core';
import { BeverageIngredientsListComponent } from '../../components/beverage-ingredients-list/beverage-ingredients-list.component';
import { BeverageIngredientsFormComponent } from '../../components/beverage-ingredients-form/beverage-ingredients-form.component';

@Component({
  selector: 'app-beverage-ingredients-page',
  imports: [BeverageIngredientsListComponent, BeverageIngredientsFormComponent],
  templateUrl: './beverage-ingredients-page.component.html',
  styleUrl: './beverage-ingredients-page.component.css'
})
export class BeverageIngredientsPageComponent {

}
