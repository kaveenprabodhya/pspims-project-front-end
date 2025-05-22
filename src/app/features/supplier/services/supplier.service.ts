import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private selectedSupplier = new BehaviorSubject<Supplier | null>(null);
  selectedSupplier$ = this.selectedSupplier.asObservable();

  constructor() { }

  setSelectedSupplier(supplier: Supplier) {
    this.selectedSupplier.next(supplier);
  }

  clearSelectedSupplier() {
    this.selectedSupplier.next(null);
  }
}
