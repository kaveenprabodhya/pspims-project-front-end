import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BeverageIngredients } from '../models/beverage-ingredients.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';

@Injectable({
  providedIn: 'root'
})
export class BeverageIngredientsService {

  private baseUrl = `${environment.apiUrl}/beverageIngredients`;

  private selectedIngredient = new BehaviorSubject<BeverageIngredients | null>(null);
  selectedIngredient$ = this.selectedIngredient.asObservable();

  private _refreshIngredients$ = new Subject<void>();
  refreshIngredients$ = this._refreshIngredients$.asObservable();

  constructor(private http: HttpClient) {}

  triggerRefresh() {
    this._refreshIngredients$.next();
  }

  // Manage selected item state
  setSelectedIngredient(ingredient: BeverageIngredients) {
    this.selectedIngredient.next(ingredient);
  }

  clearSelectedIngredient() {
    this.selectedIngredient.next(null);
  }

  // Fetch paginated list
  getAll(pageNumber: number = 0, pageSize: number = 10): Observable<PagedResponse<BeverageIngredients>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<BeverageIngredients>>(this.baseUrl, { params });
  }

  // Get by ID
  getById(id: string): Observable<BeverageIngredients> {
    return this.http.get<BeverageIngredients>(`${this.baseUrl}/${id}`);
  }

  // Create
  create(ingredient: BeverageIngredients): Observable<BeverageIngredients> {
    return this.http.post<BeverageIngredients>(this.baseUrl, ingredient);
  }

  // Update
  update(id: string, ingredient: BeverageIngredients): Observable<BeverageIngredients> {
    return this.http.put<BeverageIngredients>(`${this.baseUrl}/${id}`, ingredient);
  }

  // Patch
  patch(id: string, partialIngredient: Partial<BeverageIngredients>): Observable<BeverageIngredients> {
    return this.http.patch<BeverageIngredients>(`${this.baseUrl}/${id}`, partialIngredient);
  }

  // Delete
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
