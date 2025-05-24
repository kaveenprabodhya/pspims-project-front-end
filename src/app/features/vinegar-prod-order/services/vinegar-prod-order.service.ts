import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { VinegarProdOrder } from '../models/vinegar-prod-order.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root',
})
export class VinegarProdOrderService {
  private baseUrl = `${environment.apiUrl}/vinegarProdOrders`;

  private selectedVinegarProdOrder =
    new BehaviorSubject<VinegarProdOrder | null>(null);
  selectedVinegarProdOrder$ = this.selectedVinegarProdOrder.asObservable();

  private _refreshVinegarProdOrders$ = new Subject<void>();
  refreshVinegarProdOrders$ = this._refreshVinegarProdOrders$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshVinegarProdOrders$.next();
  }

  setSelectedVinegarProdOrder(order: VinegarProdOrder): void {
    this.selectedVinegarProdOrder.next(order);
  }

  clearSelectedVinegarProdOrder(): void {
    this.selectedVinegarProdOrder.next(null);
  }

  getAll(
    pageNumber: number = 0,
    pageSize: number = 25
  ): Observable<PagedResponse<VinegarProdOrder>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<VinegarProdOrder>>(this.baseUrl, {
      params,
    });
  }

  getById(id: string): Observable<VinegarProdOrder> {
    return this.http.get<VinegarProdOrder>(`${this.baseUrl}/${id}`);
  }

  create(order: VinegarProdOrder): Observable<VinegarProdOrder> {
    return this.http.post<VinegarProdOrder>(this.baseUrl, order);
  }

  update(id: string, order: VinegarProdOrder): Observable<VinegarProdOrder> {
    return this.http.put<VinegarProdOrder>(`${this.baseUrl}/${id}`, order);
  }

  patch(
    id: string,
    updates: Partial<VinegarProdOrder>
  ): Observable<VinegarProdOrder> {
    return this.http.patch<VinegarProdOrder>(`${this.baseUrl}/${id}`, updates);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
