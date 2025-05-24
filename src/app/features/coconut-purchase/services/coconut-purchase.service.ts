import { Injectable } from '@angular/core';
import { CoconutPurchase } from '../models/coconut-purchase.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class CoconutPurchaseService {
  private baseUrl = `${environment.apiUrl}/coconutPurchases`;

  private selectedPurchase = new BehaviorSubject<CoconutPurchase | null>(null);
  selectedPurchase$ = this.selectedPurchase.asObservable();

  private _refreshCoconutPurchase$ = new Subject<void>();
  refreshCoconutPurchase$ = this._refreshCoconutPurchase$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshCoconutPurchase$.next();
  }

  // Selection tracking
  setSelectedPurchase(purchase: CoconutPurchase): void {
    this.selectedPurchase.next(purchase);
  }

  clearSelectedPurchase(): void {
    this.selectedPurchase.next(null);
  }

  // GET paginated coconut purchases
  getAll(pageNumber: number = 0, pageSize: number = 10): Observable<PagedResponse<CoconutPurchase>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<CoconutPurchase>>(this.baseUrl, { params });
  }

  // GET coconut purchase by ID
  getById(id: string): Observable<CoconutPurchase> {
    return this.http.get<CoconutPurchase>(`${this.baseUrl}/${id}`);
  }

  // POST create coconut purchase
  create(purchase: CoconutPurchase): Observable<CoconutPurchase> {
    return this.http.post<CoconutPurchase>(this.baseUrl, purchase);
  }

  // PUT full update coconut purchase
  update(id: string, purchase: CoconutPurchase): Observable<CoconutPurchase> {
    return this.http.put<CoconutPurchase>(`${this.baseUrl}/${id}`, purchase);
  }

  // PATCH partial update coconut purchase
  patch(id: string, updates: Partial<CoconutPurchase>): Observable<CoconutPurchase> {
    return this.http.patch<CoconutPurchase>(`${this.baseUrl}/${id}`, updates);
  }

  // DELETE coconut purchase by ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
