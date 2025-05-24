import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { VinegarProdOrder } from '../../models/vinegar-prod-order.model';
import { VinegarProdOrderService } from '../../services/vinegar-prod-order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vinegar-prod-order-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './vinegar-prod-order-list.component.html',
  styleUrl: './vinegar-prod-order-list.component.css',
})
export class VinegarProdOrderListComponent {
  vinegarProdOrders: VinegarProdOrder[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private vinegarProdOrderService: VinegarProdOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVinegarProdOrders(this.pageNumber);
    this.vinegarProdOrderService.refreshVinegarProdOrders$.subscribe(() => {
      this.loadVinegarProdOrders(this.pageNumber);
    });
  }

  loadVinegarProdOrders(page: number): void {
    this.vinegarProdOrderService.getAll(page, this.pageSize).subscribe(response => {
      this.vinegarProdOrders = response.content;
      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadVinegarProdOrders(page);
    }
  }

  onEdit(order: VinegarProdOrder): void {
  }

  onDelete(order: VinegarProdOrder): void {
  }
}
