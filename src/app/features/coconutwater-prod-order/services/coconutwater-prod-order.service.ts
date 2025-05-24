import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CoconutWaterProdOrder } from '../models/coconutwater-prod-order.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class CoconutwaterProdOrderService {
  private baseUrl = `${environment.apiUrl}/coconutWaterProdOrders`;

  private selectedOrder = new BehaviorSubject<CoconutWaterProdOrder | null>(null);
  selectedOrder$ = this.selectedOrder.asObservable();

  private _refreshCoconutwaterProdOrder$ = new Subject<void>();
  refreshCoconutwaterProdOrder$ = this._refreshCoconutwaterProdOrder$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshCoconutwaterProdOrder$.next();
  }

  // Selection tracking
  setSelectedOrder(order: CoconutWaterProdOrder): void {
    this.selectedOrder.next(order);
  }

  clearSelectedOrder(): void {
    this.selectedOrder.next(null);
  }

  // GET paginated list
  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<CoconutWaterProdOrder>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<CoconutWaterProdOrder>>(this.baseUrl, { params });
  }

  // GET by ID
  getById(id: string): Observable<CoconutWaterProdOrder> {
    return this.http.get<CoconutWaterProdOrder>(`${this.baseUrl}/${id}`);
  }

  // POST create
  create(order: CoconutWaterProdOrder): Observable<CoconutWaterProdOrder> {
    return this.http.post<CoconutWaterProdOrder>(this.baseUrl, order);
  }

  // PUT full update
  update(id: string, order: CoconutWaterProdOrder): Observable<CoconutWaterProdOrder> {
    return this.http.put<CoconutWaterProdOrder>(`${this.baseUrl}/${id}`, order);
  }

  // PATCH partial update
  patch(id: string, updates: Partial<CoconutWaterProdOrder>): Observable<CoconutWaterProdOrder> {
    return this.http.patch<CoconutWaterProdOrder>(`${this.baseUrl}/${id}`, updates);
  }

  // DELETE by ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
