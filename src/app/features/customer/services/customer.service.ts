import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private selectedCustomer = new BehaviorSubject<Customer | null>(null);
  selectedCustomer$ = this.selectedCustomer.asObservable();

  constructor() { }

  setSelectedCustomer(customer: Customer) {
    this.selectedCustomer.next(customer);
  }

  clearSelectedCustomer() {
    this.selectedCustomer.next(null);
  }
}
