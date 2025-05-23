import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../models/agent.model';
import { filter } from 'rxjs';
import { AgentDepartmentTypeEnum } from '../../../../shared/enums/agent-department-type-enum';
import { Role } from '../../../../shared/enums/role-enum';

@Component({
  selector: 'app-agent-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-form.component.html',
  styleUrl: './agent-form.component.css',
})
export class AgentFormComponent {
  agent: Agent = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    username: '',
    password: '',
    role: '' as Role,
    agentDepartment: '' as AgentDepartmentTypeEnum,
    performanceRate: 0,
  };

  isEditMode = false;

  roles = Object.values(Role);
  departments = Object.values(AgentDepartmentTypeEnum);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.agentService.selectedAgent$.subscribe((data) => {
        if (data) {
          this.agent = { ...data };
        }
      });
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetFormOnRoute();
      });

    this.resetFormOnRoute();
  }

  resetFormOnRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.agentService.selectedAgent$.subscribe((data) => {
        if (data) {
          this.agent = { ...data };
        }
      });
    } else {
      this.isEditMode = false;
      this.agent = this.initEmptyAgent();
    }
  }

  initEmptyAgent() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      username: '',
      password: '',
      role: '' as any,
      agentDepartment: '' as any,
      performanceRate: 0,
    };
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateAgent();
    } else {
      this.addAgent();
    }
  }

  addAgent() {
    this.agentService.createAgent(this.agent).subscribe(() => this.resetForm());
    this.resetForm();
  }

  updateAgent() {
    if (this.agent.id)
      this.agentService
        .updateAgent(this.agent.id, this.agent)
        .subscribe(() => this.resetForm());
    this.resetForm();
  }

  resetForm() {
    this.agent = this.initEmptyAgent();
    this.agentService.clearSelectedAgent();
    this.router.navigate(['admin/dashboard/agents/list']);
  }
}
