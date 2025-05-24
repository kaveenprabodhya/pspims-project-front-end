import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DeliveryVehicle } from '../models/delivery-vehicle.model';
import { PagedResponse } from '../../../shared/page-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryVehicleService {
  private baseUrl = `${environment.apiUrl}/deliveryVehicles`;

  private selectedVehicle = new BehaviorSubject<DeliveryVehicle | null>(null);
  selectedVehicle$ = this.selectedVehicle.asObservable();

  private _refreshDeliveryVehicle$ = new Subject<void>();
  refreshDeliveryVehicle$ = this._refreshDeliveryVehicle$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshDeliveryVehicle$.next();
  }

  // Manage selected vehicle
  setSelectedVehicle(vehicle: DeliveryVehicle): void {
    this.selectedVehicle.next(vehicle);
  }

  clearSelectedVehicle(): void {
    this.selectedVehicle.next(null);
  }

  // Get all delivery vehicles with pagination
  getAll(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<DeliveryVehicle>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<DeliveryVehicle>>(this.baseUrl, { params });
  }

  // Get one by ID
  getById(id: string): Observable<DeliveryVehicle> {
    return this.http.get<DeliveryVehicle>(`${this.baseUrl}/${id}`);
  }

  // Create new delivery vehicle
  create(vehicle: DeliveryVehicle): Observable<DeliveryVehicle> {
    return this.http.post<DeliveryVehicle>(this.baseUrl, vehicle);
  }

  // Full update (PUT)
  update(id: string, vehicle: DeliveryVehicle): Observable<DeliveryVehicle> {
    return this.http.put<DeliveryVehicle>(`${this.baseUrl}/${id}`, vehicle);
  }

  // Partial update (PATCH)
  patch(id: string, updates: Partial<DeliveryVehicle>): Observable<DeliveryVehicle> {
    return this.http.patch<DeliveryVehicle>(`${this.baseUrl}/${id}`, updates);
  }

  // Delete by ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
