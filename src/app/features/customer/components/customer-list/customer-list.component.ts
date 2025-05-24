import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CustomerType } from '../../../../shared/enums/customer-type';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, TableComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers(this.pageNumber);
    this.customerService.refreshCustomer$.subscribe(() => {
      this.loadCustomers(this.pageNumber);
    });
  }

  loadCustomers(page: number): void {
    this.customerService.getAll(page, this.pageSize).subscribe(response => {
      this.customers = response.content.map(c => ({
        ...c,
        fullName: `${c.firstName} ${c.lastName}`,
      }));

      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;

      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });

    // If you want a static fallback:
    // const rawCustomers: Customer[] = [
    //   {
    //     id: '1',
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john@example.com',
    //     address: '123 Main St',
    //     customerType: CustomerType.INDIVIDUAL,
    //     creditLimit: 500,
    //   },
    // ];
    //
    // this.customers = rawCustomers.map((c) => ({
    //   ...c,
    //   fullName: `${c.firstName} ${c.lastName}`,
    // }));
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.loadCustomers(page);
    }
  }

  onEdit(customer: Customer) {
    this.customerService.setSelectedCustomer(customer);
    this.router.navigate(['/admin/dashboard/customer/form', customer.id]);
  }

  onDelete(customer: Customer) {
    if (confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`)) {
      this.customerService.delete(customer.id!).subscribe(() => {
        this.customers = this.customers.filter(c => c.id !== customer.id);
      });
      this.customerService.triggerRefresh();
    }
  }
}
