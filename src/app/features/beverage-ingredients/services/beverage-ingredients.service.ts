import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeverageIngredientsService {

  private selectedIngredient = new BehaviorSubject<any | null>(null);
  selectedIngredient$ = this.selectedIngredient.asObservable();

  constructor() { }

  setSelectedIngredient(ingredient: any) {
    this.selectedIngredient.next(ingredient);
  }

  clearSelectedIngredient() {
    this.selectedIngredient.next(null);
  }
}
