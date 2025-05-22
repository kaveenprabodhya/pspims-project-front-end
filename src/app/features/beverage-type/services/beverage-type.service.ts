import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BeverageType } from '../models/beverage-type.model';

@Injectable({
  providedIn: 'root'
})
export class BeverageTypeService {

  private selectedBeverageType = new BehaviorSubject<BeverageType | null>(null);
  selectedBeverageType$ = this.selectedBeverageType.asObservable();

  constructor() { }

  setSelectedBeverageType(beverageType: BeverageType) {
    this.selectedBeverageType.next(beverageType);
  }

  clearSelectedBeverageType() {
    this.selectedBeverageType.next(null);
  }
}
