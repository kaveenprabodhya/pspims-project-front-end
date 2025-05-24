import { Injectable } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  
  private baseUrl = `${environment.apiUrl}/inventory`;

  private selectedInventory = new BehaviorSubject<Inventory | null>(null);
  selectedInventory$ = this.selectedInventory.asObservable();

  private _refreshInventory$ = new Subject<void>();
  refreshInventory$ = this._refreshInventory$.asObservable();

  constructor(private http: HttpClient) { }

  triggerRefresh() {
    this._refreshInventory$.next();
  }

  setSelectedInventory(inventory: Inventory | null) {
    this.selectedInventory.next(inventory);
  }

  clearSelectedInventory() {
    this.selectedInventory.next(null);
  }

  // Get all inventories with pagination support
  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<Inventory>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Inventory>>(this.baseUrl, { params });
  }

  // Get one inventory by id
  getById(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseUrl}/${id}`);
  }

  // Create a new inventory
  create(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.baseUrl, inventory);
  }

  // Full update by id (PUT)
  update(id: string, inventory: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.baseUrl}/${id}`, inventory);
  }

  // Partial update by id (PATCH)
  patch(id: string, updates: Partial<Inventory>): Observable<Inventory> {
    return this.http.patch<Inventory>(`${this.baseUrl}/${id}`, updates);
  }

  // Delete inventory by id
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
