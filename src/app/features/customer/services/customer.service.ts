import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.apiUrl + '/customers'

  private selectedCustomer = new BehaviorSubject<Customer | null>(null);
  selectedCustomer$ = this.selectedCustomer.asObservable();

  private _refreshCustomer$ = new Subject<void>();
  refreshCustomer$ = this._refreshCustomer$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshCustomer$.next();
  }

  // Selected customer management
  setSelectedCustomer(customer: Customer): void {
    this.selectedCustomer.next(customer);
  }

  clearSelectedCustomer(): void {
    this.selectedCustomer.next(null);
  }

  // GET all customers (paginated)
  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<Customer>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Customer>>(this.baseUrl, { params });
  }

  // GET by ID
  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  // POST create new customer
  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  // PUT full update
  update(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customer);
  }

  // PATCH partial update
  patch(id: string, updates: Partial<Customer>): Observable<Customer> {
    return this.http.patch<Customer>(`${this.baseUrl}/${id}`, updates);
  }

  // DELETE customer
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
