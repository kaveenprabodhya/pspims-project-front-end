import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { CustomerType } from '../../../../shared/enums/customer-type';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  imports: [TableComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];

  ngOnInit(): void {
    this.loadCustomers()
  }

  loadCustomers(): void {
    const rawCustomers: Customer[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        address: '123 Main St',
        customerType: CustomerType.INDIVIDUAL,
        creditLimit: 500,
      },
    ];
  
    this.customers = rawCustomers.map(c => ({
      ...c,
      fullName: `${c.firstName} ${c.lastName}`,
    }));
  }
  
  onEdit(customers: any){}

  onDelete(customers: any){}
}
