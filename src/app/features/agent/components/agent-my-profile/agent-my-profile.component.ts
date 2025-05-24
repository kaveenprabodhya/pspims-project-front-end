import { Component, Input } from '@angular/core';
import { Agent } from '../../models/agent.model';
import { AgentDepartmentTypeEnum } from '../../../../shared/enums/agent-department-type-enum';
import { AgentService } from '../../services/agent.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { Role } from '../../../../shared/enums/role-enum';

@Component({
  selector: 'app-agent-my-profile',
  imports: [],
  templateUrl: './agent-my-profile.component.html',
  styleUrl: './agent-my-profile.component.css'
})
export class AgentMyProfileComponent {
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
