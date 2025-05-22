import { Injectable } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private selectedInventory = new BehaviorSubject<Inventory | null>(null);
  selectedInventory$ = this.selectedInventory.asObservable();

  constructor() { }

  setSelectedInventory(inventory: Inventory | null) {
    this.selectedInventory.next(inventory);
  }

  clearSelectedInventory() {
    this.selectedInventory.next(null);
  }
}
