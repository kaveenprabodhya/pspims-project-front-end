import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { SupplierPaymentDetails } from '../../models/supplier-payment-details.model';
import { SupplierPaymentDetailsService } from '../../services/supplier-payment-details.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-payment-details-list',
  imports: [TableComponent, CommonModule],
  templateUrl: './supplier-payment-details-list.component.html',
  styleUrl: './supplier-payment-details-list.component.css'
})
export class SupplierPaymentDetailsListComponent {
  supplierPayments: SupplierPaymentDetails[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private supplierPaymentDetailsService: SupplierPaymentDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSupplierPayments(this.pageNumber);
    this.supplierPaymentDetailsService.refreshSupplierPaymentDetails$.subscribe(() => {
      this.loadSupplierPayments(this.pageNumber);
    });
  }

  loadSupplierPayments(page: number): void {
    this.supplierPaymentDetailsService.getAll(page, this.pageSize).subscribe({
      next: (response) => {
        this.supplierPayments = response.content.map(c => ({
          ...c,
          supplier: {
            ...c.supplier,
            name: `${c.supplier.firstName ?? ''} ${c.supplier.lastName ?? ''}`.trim()
          }
        }));
        this.pageNumber = response.page.number;
        this.pageSize = response.page.size;
        this.totalPages = response.page.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (error) => {
        console.error('Error loading supplier payments:', error);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadSupplierPayments(page);
    }
  }

  onEdit(item: SupplierPaymentDetails): void {
  }

  onDelete(item: SupplierPaymentDetails): void {
  }
}
