import { Component } from '@angular/core';
import { BeverageType } from '../../models/beverage-type.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BeverageTypeService } from '../../services/beverage-type.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-beverage-type-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './beverage-type-form.component.html',
  styleUrl: './beverage-type-form.component.css',
})
export class BeverageTypeFormComponent {
  beverageType: BeverageType = this.initEmptyBeverageType();
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private beverageTypeService: BeverageTypeService
  ) {}

  ngOnInit() {
    this.loadBeverageType();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });
      this.resetFormOnRoute();
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.beverageTypeService.selectedBeverageType$.subscribe(data => {
        if (data) {
          this.beverageType = { ...data };
        } else {
          this.beverageTypeService.getById(id).subscribe((fetchedData) => {
            this.beverageType = { ...fetchedData };
            this.beverageTypeService.setSelectedBeverageType(fetchedData);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.beverageType = this.initEmptyBeverageType();
    }
  }

  loadBeverageType() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.beverageTypeService.selectedBeverageType$.subscribe((data) => {
        if (data) {
          this.beverageType = { ...data };
        } else {
          this.beverageTypeService.getById(id).subscribe((fetchedData) => {
            this.beverageType = { ...fetchedData };
            this.beverageTypeService.setSelectedBeverageType(fetchedData);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.beverageType = this.initEmptyBeverageType();
      this.beverageTypeService.clearSelectedBeverageType();
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
    if (this.isEditMode) {
      this.updateBeverageType();
    } else {
      this.addBeverageType();
    }
  }

  addBeverageType() {
    this.beverageTypeService.create(this.beverageType).subscribe({
      next: () => {
        this.beverageTypeService.triggerRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding beverage type:', err);
      },
    });
  }

  updateBeverageType() {
    if (!this.beverageType.id) {
      console.error('No ID found for update');
      return;
    }
    this.beverageTypeService.update(this.beverageType.id, this.beverageType).subscribe({
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
    this.beverageTypeService.clearSelectedBeverageType();
    this.beverageTypeService.triggerRefresh();
    this.router.navigate(['admin/dashboard/beverage-type/list'], { relativeTo: this.route.parent });
  }
}
