import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PagedResponse } from '../../../shared/page-response';
import { BeverageProdOrder } from '../models/beverage-prod-order.model';

@Injectable({
  providedIn: 'root'
})
export class BeverageProdOrderService {

  private baseUrl = `${environment.apiUrl}/beverageProdOrders`;

  private _refreshOBeverageProdOrder$ = new Subject<void>();
  refreshOBeverageProdOrder$ = this._refreshOBeverageProdOrder$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshOBeverageProdOrder$.next();
  }

  // Get all with pagination
  getAll(pageNumber: number = 0, pageSize: number = 10): Observable<PagedResponse<BeverageProdOrder>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<BeverageProdOrder>>(this.baseUrl, { params });
  }

  // Get one by ID
  getById(id: string): Observable<BeverageProdOrder> {
    return this.http.get<BeverageProdOrder>(`${this.baseUrl}/${id}`);
  }

  // Create
  create(order: BeverageProdOrder): Observable<BeverageProdOrder> {
    return this.http.post<BeverageProdOrder>(this.baseUrl, order);
  }

  // Update
  update(id: string, order: BeverageProdOrder): Observable<BeverageProdOrder> {
    return this.http.put<BeverageProdOrder>(`${this.baseUrl}/${id}`, order);
  }

  // Patch (partial update)
  patch(id: string, partialOrder: Partial<BeverageProdOrder>): Observable<BeverageProdOrder> {
    return this.http.patch<BeverageProdOrder>(`${this.baseUrl}/${id}`, partialOrder);
  }

  // Delete
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
