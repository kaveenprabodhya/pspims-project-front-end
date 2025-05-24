import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BeverageType } from '../../models/beverage-type.model';
import { Router } from '@angular/router';
import { BeverageTypeService } from '../../services/beverage-type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beverage-type-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './beverage-type-list.component.html',
  styleUrl: './beverage-type-list.component.css',
})
export class BeverageTypeListComponent {
  beverageTypes: BeverageType[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private router: Router,
    private beverageTypeService: BeverageTypeService
  ) {}

  ngOnInit(): void {
    this.loadBeverageTypes(this.pageNumber);
    this.beverageTypeService.refreshBeverageType$.subscribe(() => {
      this.loadBeverageTypes(this.pageNumber);
    });
  }

  loadBeverageTypes(page: number): void {
    this.beverageTypeService.getAll(page, this.pageSize).subscribe(response => {
      this.beverageTypes = response.content;

      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadBeverageTypes(page);
    }
  }

  onEdit(type: BeverageType): void {
    this.beverageTypeService.setSelectedBeverageType(type);
    this.router.navigate(['/admin/dashboard/beverage-type/form', type.id]);
  }

  onDelete(type: BeverageType): void {
    if (confirm(`Are you sure you want to delete ${type.beverageName}?`)) {
      this.beverageTypeService.delete(type.id!).subscribe(() => {
        this.beverageTypes = this.beverageTypes.filter(bt => bt.id !== type.id);
      });
      this.beverageTypeService.triggerRefresh();
    }
  }
}
