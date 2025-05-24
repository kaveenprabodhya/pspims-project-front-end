import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProdOrderDetails } from '../models/prod-order-details.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class ProdOrderDetailsService {

  private baseUrl = `${environment.apiUrl}/prodOrderDetails`;

  private selectedProdOrderDetails = new BehaviorSubject<ProdOrderDetails | null>(null);
  selectedProdOrderDetails$ = this.selectedProdOrderDetails.asObservable();

  private _refreshProdOrderDetails$ = new Subject<void>();
  refreshProdOrderDetails$ = this._refreshProdOrderDetails$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshProdOrderDetails$.next();
  }

  setSelectedProdOrderDetails(details: ProdOrderDetails) {
    this.selectedProdOrderDetails.next(details);
  }

  clearSelectedProdOrderDetails() {
    this.selectedProdOrderDetails.next(null);
  }

  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<ProdOrderDetails>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<ProdOrderDetails>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<ProdOrderDetails> {
    return this.http.get<ProdOrderDetails>(`${this.baseUrl}/${id}`);
  }

  create(details: ProdOrderDetails): Observable<ProdOrderDetails> {
    return this.http.post<ProdOrderDetails>(this.baseUrl, details);
  }

  update(id: string, details: ProdOrderDetails): Observable<ProdOrderDetails> {
    return this.http.put<ProdOrderDetails>(`${this.baseUrl}/${id}`, details);
  }

  patch(id: string, updates: Partial<ProdOrderDetails>): Observable<ProdOrderDetails> {
    return this.http.patch<ProdOrderDetails>(`${this.baseUrl}/${id}`, updates);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}