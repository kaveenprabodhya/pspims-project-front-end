import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Agent } from '../models/agent.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedResponse } from '../../../shared/page-response';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private selectedAgent = new BehaviorSubject<Agent | null>(null);
  selectedAgent$ = this.selectedAgent.asObservable();
  private readonly baseUrl = environment.apiUrl + '/agents';
  private _refreshAgents$ = new Subject<void>();
  refreshAgents$ = this._refreshAgents$.asObservable();

  constructor(private http: HttpClient) { }

  triggerAgentRefresh() {
    this._refreshAgents$.next();
  }

  setSelectedAgent(agent: Agent) {
    this.selectedAgent.next(agent);
  }

  clearSelectedAgent() {
    this.selectedAgent.next(null);
  }

  // Get paged agents
  getAgents(pageNumber: number = 0, pageSize: number = 25): Observable<PagedResponse<Agent>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Agent>>(this.baseUrl, { params });
  }

  // Get agent by id
  getAgentById(id: string): Observable<Agent> {
    return this.http.get<Agent>(`${this.baseUrl}/${id}`);
  }

  // Get agent by username
  getAgentByUsername(username: string): Observable<Agent> {
    let params = new HttpParams().set('username', username);
    return this.http.get<Agent>(`${this.baseUrl}/byUsername`, { params });
  }

  // Create new agent
  createAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.baseUrl, agent);
  }

  // Update existing agent (PUT)
  updateAgent(id: string, agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.baseUrl}/${id}`, agent);
  }

  // Partial update (PATCH)
  patchAgent(id: string, updates: Partial<Agent>): Observable<Agent> {
    return this.http.patch<Agent>(`${this.baseUrl}/${id}`, updates);
  }

  // Delete agent by id
  deleteAgent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
