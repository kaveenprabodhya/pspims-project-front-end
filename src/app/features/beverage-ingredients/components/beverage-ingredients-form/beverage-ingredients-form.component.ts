import { BeverageType } from './../../../beverage-type/models/beverage-type.model';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BeverageIngredientsService } from '../../services/beverage-ingredients.service';
import { IngredientMeasure } from '../../../../shared/enums/ingredient-measure.enum';
import { filter } from 'rxjs';
import { BeverageTypeService } from '../../../beverage-type/services/beverage-type.service';
import { BeverageIngredients } from '../../models/beverage-ingredients.model';

@Component({
  selector: 'app-beverage-ingredients-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './beverage-ingredients-form.component.html',
  styleUrl: './beverage-ingredients-form.component.css',
})
export class BeverageIngredientsFormComponent {
  ingredientForm: FormGroup;
  ingredientMeasures = Object.values(IngredientMeasure);
  beverageTypes: BeverageType[] = [];
  isEditMode = false;
  ingredient = this.initEmptyIngredient();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ingredientService: BeverageIngredientsService,
    private beverageTypeService: BeverageTypeService
  ) {
    this.ingredientForm = this.fb.group({
      ingredientName: ['', Validators.required],
      measureAmount: [0, [Validators.required, Validators.min(0)]],
      ingredientMeasure: ['', Validators.required],
      beverageType: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadBeverageTypes();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.ingredientService.selectedIngredient$.subscribe((data) => {
          if (data && data.id === id) {
            this.ingredient = { ...data };

            this.ingredientForm.patchValue({
              id: data.id,
              ingredientName: data.ingredientName,
              measureAmount: data.measureAmount,
              ingredientMeasure: data.ingredientMeasure,
              beverageType: data.beverageType,
            });
          }
        });
      } else {
        this.isEditMode = false;
        this.ingredient = this.initEmptyIngredient();
        this.ingredientService.clearSelectedIngredient();
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });
    this.resetFormOnRoute();
  }

  initEmptyIngredient(): BeverageIngredients {
    return {
      id: '',
      ingredientName: '',
      measureAmount: 0,
      ingredientMeasure: '' as IngredientMeasure,
      beverageType: {} as BeverageType,
    };
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.ingredientService.selectedIngredient$.subscribe((data) => {
        if (data) {
          this.ingredient = { ...data };
        } else {
          this.ingredientService.getById(id).subscribe((fetchedData) => {
            this.ingredient = { ...fetchedData };
            this.ingredientService.setSelectedIngredient(fetchedData);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.ingredient = this.initEmptyIngredient();
    }
  }

  onSubmit() {
    if (this.ingredientForm.invalid) return;

    this.ingredient = { ...this.ingredient, ...this.ingredientForm.value };
    
    if (this.isEditMode) {
      this.updateIngredient();
    } else {
      this.addIngredient();
    }
  }

  addIngredient() {
    const newIngredient: BeverageIngredients = this.ingredientForm.value;
    this.ingredientService.create(newIngredient).subscribe(() => {
      this.resetForm();
    });
  }

  updateIngredient() {
    if (!this.ingredient.id) {
      console.error('No ingredient ID for update');
      return;
    }

    const updatedIngredient: BeverageIngredients = this.ingredientForm.value;

    console.log(updatedIngredient);
    

    this.ingredientService
      .update(this.ingredient.id, updatedIngredient)
      .subscribe({
        next: () => {
          this.resetForm();
        },
        error: (err) => {
          console.error('Failed to update ingredient:', err);
        },
      });
  }

  resetForm() {
    this.ingredient = this.initEmptyIngredient();
    this.ingredientService.clearSelectedIngredient();
    this.ingredientService.triggerRefresh();
    this.router.navigate(['admin/dashboard/beverage-ingredients/list']);
  }

  loadBeverageTypes() {
    this.beverageTypeService.getAll().subscribe((response) => {
      this.beverageTypes = response.content;

      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.ingredientService.getById(id).subscribe((data) => {
          this.ingredient = { ...data };

          const matchedType = this.beverageTypes.find(
            (type) => type.id === data.beverageType.id
          );

          this.ingredientForm.patchValue({
            ingredientName: data.ingredientName,
            measureAmount: data.measureAmount,
            ingredientMeasure: data.ingredientMeasure,
            beverageType: matchedType || null,
          });
        });
      }
    });
  }
}
