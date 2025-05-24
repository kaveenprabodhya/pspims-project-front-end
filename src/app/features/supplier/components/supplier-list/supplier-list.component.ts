import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Supplier } from '../../models/supplier.model';
import { SupplierService } from '../../services/supplier.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-list',
  imports: [CommonModule, TableComponent],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent {
  suppliers: Supplier[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers(this.pageNumber);
    this.supplierService.refreshSupplier$.subscribe(() => {
      this.loadSuppliers(this.pageNumber);
    });
  }

  loadSuppliers(page: number): void {
    this.supplierService.getAll(page, this.pageSize).subscribe(response => {
      this.suppliers = response.content.map(s => ({
        ...s,
        name: `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim()
      }));

      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.loadSuppliers(page);
    }
  }

  onEdit(supplier: Supplier): void {
    this.supplierService.setSelectedSupplier(supplier);
    this.router.navigate(['admin/dashboard/supplier/form', supplier.id]);
  }

  onDelete(supplier: Supplier): void {
    if (confirm(`Are you sure you want to delete ${supplier.firstName} ${supplier.lastName}?`)) {
      this.supplierService.delete(supplier.id!).subscribe(() => {
        this.suppliers = this.suppliers.filter(s => s.id !== supplier.id);
      });
      this.supplierService.triggerRefresh();
    }
  }
}
