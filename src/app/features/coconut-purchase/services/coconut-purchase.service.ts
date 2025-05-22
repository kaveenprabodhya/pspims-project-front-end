import { Injectable } from '@angular/core';
import { CoconutPurchase } from '../models/coconut-purchase.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoconutPurchaseService {
  private selectedPurchase = new BehaviorSubject<CoconutPurchase | null>(null);
  selectedPurchase$ = this.selectedPurchase.asObservable();

  constructor() { }

  setSelectedPurchase(purchase: CoconutPurchase) {
    this.selectedPurchase.next(purchase);
  }

  clearSelectedPurchase() {
    this.selectedPurchase.next(null);
  }
}
