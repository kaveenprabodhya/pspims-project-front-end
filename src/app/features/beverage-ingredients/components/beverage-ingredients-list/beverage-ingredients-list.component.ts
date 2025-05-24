import { Component } from '@angular/core';
import { BeverageIngredients } from '../../models/beverage-ingredients.model';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BeverageIngredientsService } from '../../services/beverage-ingredients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beverage-ingredients-list',
  imports: [CommonModule, TableComponent],
  templateUrl: './beverage-ingredients-list.component.html',
  styleUrl: './beverage-ingredients-list.component.css',
})
export class BeverageIngredientsListComponent {
  beverageIngredients: BeverageIngredients[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private router: Router,
    private ingredientService: BeverageIngredientsService
  ) {}

  ngOnInit(): void {
    this.loadIngredients(this.pageNumber);
    this.ingredientService.refreshIngredients$.subscribe(() => {
      this.loadIngredients(this.pageNumber);
    });
    
  }

  loadIngredients(page: number): void {
    this.ingredientService.getAll(page, this.pageSize).subscribe(response => {
      this.beverageIngredients = response.content;

      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadIngredients(page);
    }
  }

  onEdit(ingredient: BeverageIngredients): void {
    this.ingredientService.setSelectedIngredient(ingredient);
    this.router.navigate(['/admin/dashboard/beverage-ingredients/form', ingredient.id]);
  }

  onDelete(ingredient: BeverageIngredients): void {
    if (confirm(`Delete ingredient ${ingredient.ingredientName}?`)) {
      this.ingredientService.delete(ingredient.id!).subscribe(() => {
        this.beverageIngredients = this.beverageIngredients.filter(i => i.id !== ingredient.id);
      });
      this.ingredientService.triggerRefresh();
    }
  }
}
