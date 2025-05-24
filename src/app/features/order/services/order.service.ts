import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  private selectedOrder = new BehaviorSubject<Order | null>(null);
  selectedOrder$ = this.selectedOrder.asObservable();

  private _refreshOrders$ = new Subject<void>();
  refreshOrders$ = this._refreshOrders$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshOrders$.next();
  }

  setSelectedOrder(order: Order) {
    this.selectedOrder.next(order);
  }

  clearSelectedOrder() {
    this.selectedOrder.next(null);
  }

  // Get paginated list of orders
  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<Order>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Order>>(this.baseUrl, { params });
  }

  // Get order by ID
  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  // Create new order
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  // Full update order by ID (PUT)
  update(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
  }

  // Partial update order by ID (PATCH)
  patch(id: string, updates: Partial<Order>): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}`, updates);
  }

  // Delete order by ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
