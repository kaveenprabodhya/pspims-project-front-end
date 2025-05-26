import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../models/agent.model';
import { filter } from 'rxjs';
import { AgentDepartmentTypeEnum } from '../../../../shared/enums/agent-department-type-enum';
import { Role } from '../../../../shared/enums/role-enum';

@Component({
  selector: 'app-agent-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent-form.component.html',
  styleUrl: './agent-form.component.css',
})
export class AgentFormComponent {
  agentForm!: FormGroup;
  isEditMode = false;
  roles = Object.values(Role);
  departments = Object.values(AgentDepartmentTypeEnum);
  agent: Agent = this.initEmptyAgent()

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {
    this.agentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      agentDepartment: ['', Validators.required],
      performanceRate: [null, [Validators.required, Validators.min(0)]],
    });
    
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.agentService.selectedAgent$.subscribe((data) => {
          if (data && data.id === id) {
            this.agent = { ...data };

            this.agentForm.patchValue(this.agent);
          } else {
            this.agentService.getAgentById(id).subscribe((agent) => {
              this.agent = agent;
              this.agentForm.patchValue(agent);
              this.agentService.setSelectedAgent(agent);
            });
          }
        });
      } else {
        this.isEditMode = false;
        this.agent = this.initEmptyAgent();
        this.agentService.clearSelectedAgent();
      }
    });

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
        } else {
          this.agentService.getAgentById(id).subscribe((agent) => {
            this.agent = agent;
            this.agentForm.patchValue(agent);
            this.agentService.setSelectedAgent(agent);
          });
        }
      });
    } else {
      this.isEditMode = false;
      this.agent = this.initEmptyAgent();
    }
  }

  onSubmit(): void {

    if (this.agentForm.invalid) {
      this.agentForm.markAllAsTouched();
      return;
    }

    this.agent = { ...this.agent, ...this.agentForm.value };
    
    if (this.isEditMode) {
      this.updateAgent();
    } else {
      this.addAgent();
    }
  }

  addAgent() {
    this.agentService.createAgent(this.agent).subscribe({
      next: (created) => {
        this.agentService.triggerAgentRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding customer', err);
      },
    });
  }

  updateAgent() {
    if (!this.agent.id) {
      console.error('Customer ID is missing for update');
      return;
    }
    this.agentService.updateAgent(this.agent.id, this.agent).subscribe({
      next: (updated) => {
        this.agentService.triggerAgentRefresh();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating customer', err);
      },
    });
  }

  initEmptyAgent(): Agent {
    return {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      username: '',
      password: '',
      role: '' as Role,
      agentDepartment: '' as AgentDepartmentTypeEnum,
      performanceRate: null as any,
    }
  }

  resetForm(): void {
    this.agent = this.initEmptyAgent();
    this.agentForm.reset(this.agent);
    this.agentService.clearSelectedAgent();
    this.agentService.triggerAgentRefresh();
    this.router.navigate(['admin/dashboard/agent/main/list']);
  }

  getFormErrors(form: FormGroup = this.agentForm, parentKey: string = ''): string[] {
    const errors: string[] = [];
  
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      const controlPath = parentKey ? `${parentKey}.${key}` : key;
  
      if (control instanceof FormGroup) {
        errors.push(...this.getFormErrors(control, controlPath));
      } else if (control && control.invalid && (control.dirty || control.touched)) {
        const controlErrors = control.errors;
        if (controlErrors) {
          Object.keys(controlErrors).forEach((errorKey) => {
            const fieldName = this.formatFieldName(controlPath);
            let message = `${fieldName}: ${errorKey}`;
  
            // Custom error messages
            if (errorKey === 'required') {
              message = `${fieldName} is required.`;
            } else if (errorKey === 'email') {
              message = `${fieldName} must be a valid email address.`;
            } else if (errorKey === 'minlength') {
              message = `${fieldName} is too short.`;
            } else if (errorKey === 'maxlength') {
              message = `${fieldName} is too long.`;
            } else if (errorKey === 'pattern') {
              message = `${fieldName} format is invalid.`;
            }
  
            errors.push(message);
          });
        }
      }
    });
  
    return errors;
  }
  
  private formatFieldName(fieldPath: string): string {
    return fieldPath
      .split('.')
      .map(part =>
        part
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim()
      )
      .join(' > ');
  }  
  
}
