import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private baseUrl = `${environment.apiUrl}/suppliers`;

  private selectedSupplier = new BehaviorSubject<Supplier | null>(null);
  selectedSupplier$ = this.selectedSupplier.asObservable();

  private _refreshSupplier$ = new Subject<void>();
  refreshSupplier$ = this._refreshSupplier$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshSupplier$.next();
  }

  setSelectedSupplier(supplier: Supplier) {
    this.selectedSupplier.next(supplier);
  }

  clearSelectedSupplier() {
    this.selectedSupplier.next(null);
  }

  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<Supplier>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Supplier>>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/${id}`);
  }

  create(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, supplier);
  }

  update(id: string, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/${id}`, supplier);
  }

  patch(id: string, updates: Partial<Supplier>): Observable<Supplier> {
    return this.http.patch<Supplier>(`${this.baseUrl}/${id}`, updates);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
