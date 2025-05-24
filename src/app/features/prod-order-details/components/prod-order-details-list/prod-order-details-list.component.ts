import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ProdOrderDetails } from '../../models/prod-order-details.model';
import { CommonModule } from '@angular/common';
import { ProdOrderDetailsService } from '../../services/prod-order-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-order-details-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './prod-order-details-list.component.html',
  styleUrl: './prod-order-details-list.component.css',
})
export class ProdOrderDetailsListComponent {
  prodOrderDetailsList: ProdOrderDetails[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private prodOrderDetailsService: ProdOrderDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProdOrderDetails(this.pageNumber);
    this.prodOrderDetailsService.refreshProdOrderDetails$.subscribe(() => {
      this.loadProdOrderDetails(this.pageNumber);
    });
  }

  loadProdOrderDetails(page: number): void {
    this.prodOrderDetailsService.getAll(page, this.pageSize).subscribe(response => {
      this.prodOrderDetailsList = response.content;
      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    }, error => {
      console.error('Error loading ProdOrderDetails:', error);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadProdOrderDetails(page);
    }
  }

  onEdit(prodOrderDetails: ProdOrderDetails): void {
  }

  onDelete(prodOrderDetails: ProdOrderDetails): void {
    this.prodOrderDetailsService.triggerRefresh();
  }
}
