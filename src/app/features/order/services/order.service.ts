import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private selectedOrder = new BehaviorSubject<Order | null>(null);
  selectedOrder$ = this.selectedOrder.asObservable();

  constructor() {}

  setSelectedOrder(order: Order) {
    this.selectedOrder.next(order);
  }

  clearSelectedOrder() {
    this.selectedOrder.next(null);
  }
}
