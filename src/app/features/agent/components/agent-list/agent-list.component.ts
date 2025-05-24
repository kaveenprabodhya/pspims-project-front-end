import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../models/agent.model';
import { AgentDepartmentTypeEnum } from '../../../../shared/enums/agent-department-type-enum';
import { Role } from '../../../../shared/enums/role-enum';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-agent-list',
  imports: [CommonModule, ModalComponent],
  templateUrl: './agent-list.component.html',
  styleUrl: './agent-list.component.css',
})
export class AgentListComponent {
  agents: Agent[] = [
    {
      id: '1',
      role: Role.ROLE_ADMIN,
      email: 'alice@example.com',
      address: 'asdf',
      firstName: 'Alison',
      lastName: 'Jacob',
      performanceRate: 1.0,
      password: 'aaaaaaaaaaa',
      username: 'qwertydszxc',
      agentDepartment: AgentDepartmentTypeEnum.FINANCE,
    },
  ];
  showModal: boolean = false;
  selectedAgent: Agent | null = null;
  selectedHtml: string = '';
  pageNumber: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private router: Router, private agentService: AgentService) {}

  ngOnInit(): void {
    this.loadAgents(this.pageNumber);
    this.agentService.refreshAgents$.subscribe(() => {
      this.loadAgents(this.pageNumber);
    });
  }

  loadAgents(page: number): void {
    this.agentService.getAgents(page, this.pageSize).subscribe((response) => {
      this.agents = response.content.map(agent => ({
        ...agent,
        fullName: `${agent.firstName ?? ''} ${agent.lastName ?? ''}`.trim(),
      }));
  
      this.pageNumber = response.page.number;
      this.pageSize = response.page.size;
      this.totalPages = response.page.totalPages;
  
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.loadAgents(page);
    }
  }

  onView(agent: Agent): void {
    this.selectedHtml = `
      <div>
        <p><strong>Full Name:</strong> ${agent.firstName} ${agent.lastName}</p>
        <p><strong>Email:</strong> ${agent.email}</p>
        <p><strong>Username:</strong> ${agent.username}</p>
        <p><strong>Address:</strong> ${agent.address}</p>
        <p><strong>Role:</strong> ${agent.role}</p>
        <p><strong>Department:</strong> ${agent.agentDepartment}</p>
        <p><strong>Performance Rate:</strong> ${agent.performanceRate}</p>
      </div>
    `;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedAgent = null;
  }

  onEdit(agent: Agent): void {
    this.agentService.setSelectedAgent(agent);
    this.router.navigate(['/admin/dashboard/agent/main/form', agent.id]);
  }

  onDelete(agent: Agent): void {
    if (confirm(`Are you sure you want to delete ${agent.firstName}?`)) {
      this.agentService.deleteAgent(agent.id!).subscribe(() => {
        this.agents = this.agents.filter((a) => a.id !== agent.id);
      });
      this.agentService.triggerAgentRefresh();
    }
  }
}
