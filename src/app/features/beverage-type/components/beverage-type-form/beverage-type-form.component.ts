import { Component } from '@angular/core';
import { BeverageType } from '../../models/beverage-type.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BeverageTypeService } from '../../services/beverage-type.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-beverage-type-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './beverage-type-form.component.html',
  styleUrl: './beverage-type-form.component.css',
})
export class BeverageTypeFormComponent {
  beverageTypeForm: FormGroup;
  isEditMode = false;
  beverageType: BeverageType = this.initEmptyBeverageType();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private beverageTypeService: BeverageTypeService
  ) {
    this.beverageTypeForm = this.fb.group({
      beverageName: ['', Validators.required],
      beverageDescription: ['', Validators.required],
      isActive: [false],
      nutritionInfo: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadBeverageType();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.resetFormOnRoute());

    this.resetFormOnRoute();
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.beverageTypeService.selectedBeverageType$.subscribe((data) => {
        if (data) {
          this.beverageType = { ...data };
          this.beverageTypeForm.patchValue(data);
        } else {
          this.beverageTypeService.getById(id).subscribe((fetchedData) => {
            this.beverageType = { ...fetchedData };
            this.beverageTypeService.setSelectedBeverageType(fetchedData);
            this.beverageTypeForm.patchValue(fetchedData);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.beverageType = this.initEmptyBeverageType();
      this.beverageTypeService.clearSelectedBeverageType();
      this.beverageTypeForm.reset(this.beverageType);
    }
  }

  loadBeverageType() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.beverageTypeService.getById(id).subscribe((data) => {
        this.beverageType = { ...data };
        this.beverageTypeForm.patchValue(this.beverageType);
        this.beverageTypeService.setSelectedBeverageType(data);
      });
    }
  }

  initEmptyBeverageType(): BeverageType {
    return {
      beverageName: '',
      beverageDescription: '',
      isActive: false,
      nutritionInfo: '',
      beverageIngredients: [],
      beverageProdOrder: [],
    };
  }

  onSubmit() {
    if (this.beverageTypeForm.invalid) {
      this.beverageTypeForm.markAllAsTouched();
      return;
    }

    const formValue = this.beverageTypeForm.value;

    if (this.isEditMode) {
      this.updateBeverageType(formValue);
    } else {
      this.addBeverageType(formValue);
    }
  }

  addBeverageType(formValue: BeverageType) {
    this.beverageTypeService.create(formValue).subscribe({
      next: () => {
        this.beverageTypeService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding beverage type:', err);
      },
    });
  }

  updateBeverageType(formValue: BeverageType) {
    if (!this.beverageType.id) {
      console.error('No ID found for update');
      return;
    }

    this.beverageTypeService.update(this.beverageType.id, formValue).subscribe({
      next: () => {
        this.beverageTypeService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating beverage type:', err);
      },
    });
  }

  resetForm() {
    this.beverageType = this.initEmptyBeverageType();
    this.beverageTypeForm.reset(this.beverageType);
    this.beverageTypeService.clearSelectedBeverageType();
    this.beverageTypeService.triggerRefresh();
    this.router.navigate(['admin/dashboard/beverage-type/list']);
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    const controls = this.beverageTypeForm.controls;
  
    if (controls['beverageName'].touched && controls['beverageName'].errors) {
      if (controls['beverageName'].errors['required']) {
        errors.push('Beverage name is required.');
      }
    }
  
    if (controls['beverageDescription'].touched && controls['beverageDescription'].errors) {
      if (controls['beverageDescription'].errors['required']) {
        errors.push('Beverage description is required.');
      }
    }
  
    if (controls['nutritionInfo'].touched && controls['nutritionInfo'].errors) {
      if (controls['nutritionInfo'].errors['required']) {
        errors.push('Nutrition info is required.');
      }
    }
  
    if (controls['isActive'].touched && controls['isActive'].errors) {
      if (controls['isActive'].errors['required']) {
        errors.push('Active status must be specified.');
      }
    }
  
    return errors;
  }
  
}
