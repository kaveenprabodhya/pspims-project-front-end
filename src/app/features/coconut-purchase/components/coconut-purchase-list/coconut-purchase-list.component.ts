import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { CoconutPurchase } from '../../models/coconut-purchase.model';
import { CoconutQualityGrade } from '../../../../shared/enums/coconut-quality-grade.enum';
import { CoconutPurchaseService } from '../../services/coconut-purchase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coconut-purchase-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './coconut-purchase-list.component.html',
  styleUrl: './coconut-purchase-list.component.css'
})
export class CoconutPurchaseListComponent {
  coconutPurchases: CoconutPurchase[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private purchaseService: CoconutPurchaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPurchases(this.pageNumber);
    this.purchaseService.refreshCoconutPurchase$.subscribe(() => {
      this.loadPurchases(this.pageNumber);
    });
  }

  loadPurchases(page: number): void {
    this.purchaseService.getAll(page, this.pageSize).subscribe({
      next: (response) => {
        this.coconutPurchases = response.content;
        this.pageNumber = response.page.number;
        this.pageSize = response.page.size;
        this.totalPages = response.page.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err) => {
        console.error('Failed to load coconut purchases', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadPurchases(page);
    }
  }

  onEdit(item: CoconutPurchase): void {
    this.purchaseService.setSelectedPurchase(item);
    this.router.navigate(['/admin/dashboard/coconut-purchase/form', item.id]);
  }

  onDelete(item: CoconutPurchase): void {
    if (confirm(`Are you sure you want to delete purchase with ID ${item.id}?`)) {
      this.purchaseService.delete(item.id!).subscribe(() => {
        this.coconutPurchases = this.coconutPurchases.filter(p => p.id !== item.id);
      });
      this.purchaseService.triggerRefresh();
    }
  }
}
