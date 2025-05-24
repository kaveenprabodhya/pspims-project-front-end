import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BeverageType } from '../models/beverage-type.model';
import { PagedResponse } from '../../../shared/page-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeverageTypeService {
 
  private baseUrl = `${environment.apiUrl}/beverageTypes`;

  private selectedBeverageType = new BehaviorSubject<BeverageType | null>(null);
  selectedBeverageType$ = this.selectedBeverageType.asObservable();

  private _refreshBeverageType$ = new Subject<void>();
  refreshBeverageType$ = this._refreshBeverageType$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshBeverageType$.next();
  }

  // Selection handling
  setSelectedBeverageType(beverageType: BeverageType) {
    this.selectedBeverageType.next(beverageType);
  }

  clearSelectedBeverageType() {
    this.selectedBeverageType.next(null);
  }

  // GET paginated beverage types
  getAll(pageNumber: number = 0, pageSize: number = 10): Observable<PagedResponse<BeverageType>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<BeverageType>>(this.baseUrl, { params });
  }

  // GET by ID
  getById(id: string): Observable<BeverageType> {
    return this.http.get<BeverageType>(`${this.baseUrl}/${id}`);
  }

  // POST create
  create(beverageType: BeverageType): Observable<BeverageType> {
    return this.http.post<BeverageType>(this.baseUrl, beverageType);
  }

  // PUT update
  update(id: string, beverageType: BeverageType): Observable<BeverageType> {
    return this.http.put<BeverageType>(`${this.baseUrl}/${id}`, beverageType);
  }

  // PATCH partial update
  patch(id: string, updates: Partial<BeverageType>): Observable<BeverageType> {
    return this.http.patch<BeverageType>(`${this.baseUrl}/${id}`, updates);
  }

  // DELETE
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
