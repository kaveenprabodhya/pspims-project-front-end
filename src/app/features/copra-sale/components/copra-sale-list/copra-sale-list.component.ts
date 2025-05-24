import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CopraSale } from '../../models/copra-sale.model';
import { Router } from '@angular/router';
import { CopraSaleService } from '../../services/copra-sale.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copra-sale-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './copra-sale-list.component.html',
  styleUrl: './copra-sale-list.component.css',
})
export class CopraSaleListComponent {
  copraSales: CopraSale[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private copraSaleService: CopraSaleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSales(this.pageNumber);
    this.copraSaleService.refreshCopraSale$.subscribe(() => {
      this.loadSales(this.pageNumber);
    });
  }

  loadSales(page: number): void {
    this.copraSaleService.getAll(page, this.pageSize).subscribe({
      next: (response) => {
        this.copraSales = response.content;
        this.pageNumber = response.page.number;
        this.pageSize = response.page.size;
        this.totalPages = response.page.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err) => {
        console.error('Failed to load copra sales', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadSales(page);
    }
  }

  onEdit(sale: CopraSale): void {
    this.copraSaleService.setSelectedSale(sale);
    this.router.navigate(['/admin/dashboard/copra-sale/form', sale.id]);
  }

  onDelete(sale: CopraSale): void {
    if (confirm(`Are you sure you want to delete the sale with ID ${sale.id}?`)) {
      this.copraSaleService.delete(sale.id!).subscribe(() => {
        this.copraSales = this.copraSales.filter(s => s.id !== sale.id);
      });
      this.copraSaleService.triggerRefresh();
    }
  }

}
