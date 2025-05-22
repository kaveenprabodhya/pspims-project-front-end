import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CopraSale } from '../models/copra-sale.model';

@Injectable({
  providedIn: 'root'
})
export class CopraSaleService {
  private selectedSale = new BehaviorSubject<CopraSale | null>(null);
  selectedSale$ = this.selectedSale.asObservable();

  constructor() { }

  setSelectedSale(sale: CopraSale) {
    this.selectedSale.next(sale);
  }

  clearSelectedSale() {
    this.selectedSale.next(null);
  }
}
