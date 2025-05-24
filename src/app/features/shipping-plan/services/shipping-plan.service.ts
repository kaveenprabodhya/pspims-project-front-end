import { Injectable } from '@angular/core';
import { ShippingPlan } from '../models/shipping-plan.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class ShippingPlanService {

  private baseUrl = `${environment.apiUrl}/shippingPlans`;

  private selectedShippingPlan = new BehaviorSubject<ShippingPlan | null>(null);
  selectedShippingPlan$ = this.selectedShippingPlan.asObservable();

  private _refreshShippingPlan$ = new Subject<void>();
  refreshShippingPlan$ = this._refreshShippingPlan$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshShippingPlan$.next();
  }

  setSelectedShippingPlan(plan: ShippingPlan) {
    this.selectedShippingPlan.next(plan);
  }

  clearSelectedShippingPlan() {
    this.selectedShippingPlan.next(null);
  }

  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<ShippingPlan>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<ShippingPlan>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<ShippingPlan> {
    return this.http.get<ShippingPlan>(`${this.baseUrl}/${id}`);
  }

  create(plan: ShippingPlan): Observable<ShippingPlan> {
    return this.http.post<ShippingPlan>(this.baseUrl, plan);
  }

  update(id: string, plan: ShippingPlan): Observable<ShippingPlan> {
    return this.http.put<ShippingPlan>(`${this.baseUrl}/${id}`, plan);
  }

  patch(id: string, updates: Partial<ShippingPlan>): Observable<ShippingPlan> {
    return this.http.patch<ShippingPlan>(`${this.baseUrl}/${id}`, updates);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
