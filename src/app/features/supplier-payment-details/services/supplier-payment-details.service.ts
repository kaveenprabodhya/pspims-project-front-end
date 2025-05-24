import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SupplierPaymentDetails } from '../models/supplier-payment-details.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class SupplierPaymentDetailsService {

  private baseUrl = `${environment.apiUrl}/supplierPaymentDetails`;

  private selectedSupplierPaymentDetails = new BehaviorSubject<SupplierPaymentDetails | null>(null);
  selectedSupplierPaymentDetails$ = this.selectedSupplierPaymentDetails.asObservable();

  private _refreshSupplierPaymentDetails$ = new Subject<void>();
  refreshSupplierPaymentDetails$ = this._refreshSupplierPaymentDetails$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshSupplierPaymentDetails$.next();
  }

  setSelectedSupplierPaymentDetails(details: SupplierPaymentDetails) {
    this.selectedSupplierPaymentDetails.next(details);
  }

  clearSelectedSupplierPaymentDetails() {
    this.selectedSupplierPaymentDetails.next(null);
  }

  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<SupplierPaymentDetails>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<SupplierPaymentDetails>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<SupplierPaymentDetails> {
    return this.http.get<SupplierPaymentDetails>(`${this.baseUrl}/${id}`);
  }

  create(details: SupplierPaymentDetails): Observable<SupplierPaymentDetails> {
    return this.http.post<SupplierPaymentDetails>(this.baseUrl, details);
  }

  update(id: string, details: SupplierPaymentDetails): Observable<SupplierPaymentDetails> {
    return this.http.put<SupplierPaymentDetails>(`${this.baseUrl}/${id}`, details);
  }

  patch(id: string, updates: Partial<SupplierPaymentDetails>): Observable<SupplierPaymentDetails> {
    return this.http.patch<SupplierPaymentDetails>(`${this.baseUrl}/${id}`, updates);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
