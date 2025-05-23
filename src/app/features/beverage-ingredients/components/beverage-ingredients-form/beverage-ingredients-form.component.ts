import { BeverageType } from './../../../beverage-type/models/beverage-type.model';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BeverageIngredients } from '../../models/beverage-ingredients.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BeverageIngredientsService } from '../../services/beverage-ingredients.service';
import { IngredientMeasure } from '../../../../shared/enums/ingredient-measure.enum';
import { filter } from 'rxjs';

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
    ingredientMeasure: IngredientMeasure.GRAM,
    beverageType: null as any
  };
  
  isEditMode = false;

  ingredientMeasures = Object.values(IngredientMeasure);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: BeverageIngredientsService
  ) {}

  ngOnInit(){
    // this.beverageTypeService.getAll().subscribe(types => {
    //   this.beverageTypes = types;
    // });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;

      // Use shared service to get selected ingredient
      this.ingredientService.selectedIngredient$.subscribe(data => {
        if (data) {
          this.ingredient = { ...data };
        } else {
          // Optional: fetch from backend using ID
          // this.ingredientService.getById(+id).subscribe(fetched => {
          //   this.ingredient = fetched;
          // });
        }
      });
    } else {
      this.isEditMode = false;
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });

    this.resetFormOnRoute();
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.ingredientService.selectedIngredient$.subscribe(data => {
        if (data) {
          this.ingredient = { ...data };
        } else {
          // Optionally fetch by ID if someone typed the URL directly
        }
      });
    } else {
      this.isEditMode = false;
      this.ingredient = this.initEmptyIngredient();
    }
  }

  initEmptyIngredient() {
    return {
      ingredientName: '',
      measureAmount: 0,
      ingredientMeasure: '' as any,
      beverageType: null as any
    };
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateIngredient();
    } else {
      this.addIngredient();
    }
  }

  addIngredient() {
    // call API to add new
    // this.yourService.addIngredient(this.ingredient).subscribe(() => {
    //   // handle success
    //   this.resetForm();
    // });
    this.resetForm();
  }
  
  updateIngredient() {
    // call API to update
    // this.yourService.updateIngredient(this.ingredient.id, this.ingredient).subscribe(() => {
    //   // handle success
    //   this.resetForm();
    // });
    this.resetForm();
  }

  resetForm() {
    this.ingredient = this.initEmptyIngredient();
    this.ingredientService.clearSelectedIngredient();
    this.router.navigate(['admin/dashboard/beverage-ingredients/list']);
  }

}
