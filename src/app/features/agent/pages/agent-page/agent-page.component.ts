import { Agent } from './../../models/agent.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentMainComponent } from '../../components/agent-main/agent-main.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { Role } from '../../../../shared/enums/role-enum';
import { AgentDepartmentTypeEnum } from '../../../../shared/enums/agent-department-type-enum';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-page',
  imports: [CommonModule, AgentMainComponent],
  templateUrl: './agent-page.component.html',
  styleUrl: './agent-page.component.css',
})
export class AgentPageComponent {
  user!: Agent;

  constructor(private authService: AuthService,
    private agentService: AgentService) {
    this.user = {
      id: '',
      role: '' as Role,
      email: '',
      address: '',
      firstName: '',
      lastName: '',
      performanceRate: 0,
      password: '',
      username: '',
      agentDepartment: '' as AgentDepartmentTypeEnum,
    };
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser?.username) {
      this.agentService.getAgentByUsername(currentUser.username).subscribe({
        next: (agent) => {
          this.user = agent;
        },
        error: (err) => {
          console.error('Failed to fetch agent details', err);
        }
      });
    } else {
      console.warn('No user found in local storage');
    }
  }
}
