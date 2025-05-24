import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PaymentDetails } from '../models/payment-details.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  private baseUrl = `${environment.apiUrl}/paymentDetails`;

  private selectedPaymentDetails = new BehaviorSubject<PaymentDetails | null>(null);
  selectedPaymentDetails$ = this.selectedPaymentDetails.asObservable();

  private _refreshPaymentDetails$ = new Subject<void>();
  refreshPaymentDetails$ = this._refreshPaymentDetails$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshPaymentDetails$.next();
  }

  setSelectedPaymentDetails(paymentDetails: PaymentDetails) {
    this.selectedPaymentDetails.next(paymentDetails);
  }

  clearSelectedPaymentDetails() {
    this.selectedPaymentDetails.next(null);
  }

  // Get paginated list of payment details
  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<PaymentDetails>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<PaymentDetails>>(this.baseUrl, { params });
  }

  // Get payment details by ID
  getById(id: string): Observable<PaymentDetails> {
    return this.http.get<PaymentDetails>(`${this.baseUrl}/${id}`);
  }

  // Create new payment details
  create(paymentDetails: PaymentDetails): Observable<PaymentDetails> {
    return this.http.post<PaymentDetails>(this.baseUrl, paymentDetails);
  }

  // Full update payment details by ID (PUT)
  update(id: string, paymentDetails: PaymentDetails): Observable<PaymentDetails> {
    return this.http.put<PaymentDetails>(`${this.baseUrl}/${id}`, paymentDetails);
  }

  // Partial update payment details by ID (PATCH)
  patch(id: string, updates: Partial<PaymentDetails>): Observable<PaymentDetails> {
    return this.http.patch<PaymentDetails>(`${this.baseUrl}/${id}`, updates);
  }

  // Delete payment details by ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
