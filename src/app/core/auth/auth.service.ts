import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../../features/agent/models/agent.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient, private router: Router) {}

  getCurrentUser(): { username: string; token: string } | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        console.error('Invalid user JSON in localStorage', e);
      }
    }
    return null;
  }

  login(username: string, password: string): Observable<string> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.baseUrl + '/login', body.toString(), {
      headers,
      responseType: 'text'
    });
  }

  signup(agent: Agent): Observable<string> {
    const body = new HttpParams()
      .set('username', agent.username)
      .set('password', agent.password)
      .set('firstName', agent.firstName)
      .set('lastName', agent.lastName)
      .set('email', agent.email)
      .set('address', agent.address)
      .set('role', agent.role)
      .set('agentDepartmentType', agent.agentDepartment);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.baseUrl + '/signup', body.toString(), {
      headers,
      responseType: 'text'
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
