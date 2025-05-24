import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CopraSale } from '../models/copra-sale.model';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class CopraSaleService {
  private baseUrl = `${environment.apiUrl}/copraSales`;

  private selectedSale = new BehaviorSubject<CopraSale | null>(null);
  selectedSale$ = this.selectedSale.asObservable();

  private _refreshCopraSale$ = new Subject<void>();
  refreshCopraSale$ = this._refreshCopraSale$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshCopraSale$.next();
  }

  // Selection
  setSelectedSale(sale: CopraSale): void {
    this.selectedSale.next(sale);
  }

  clearSelectedSale(): void {
    this.selectedSale.next(null);
  }

  // GET all (paginated)
  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<CopraSale>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<CopraSale>>(this.baseUrl, { params });
  }

  // GET by ID
  getById(id: string): Observable<CopraSale> {
    return this.http.get<CopraSale>(`${this.baseUrl}/${id}`);
  }

  // POST create
  create(sale: CopraSale): Observable<CopraSale> {
    return this.http.post<CopraSale>(this.baseUrl, sale);
  }

  // PUT full update
  update(id: string, sale: CopraSale): Observable<CopraSale> {
    return this.http.put<CopraSale>(`${this.baseUrl}/${id}`, sale);
  }

  // PATCH partial update
  patch(id: string, updates: Partial<CopraSale>): Observable<CopraSale> {
    return this.http.patch<CopraSale>(`${this.baseUrl}/${id}`, updates);
  }

  // DELETE
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
