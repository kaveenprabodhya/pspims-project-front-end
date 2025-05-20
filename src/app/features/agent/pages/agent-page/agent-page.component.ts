import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentListComponent } from '../../components/agent-list/agent-list.component';

@Component({
  selector: 'app-agent-page',
  imports: [CommonModule, AgentListComponent],
  templateUrl: './agent-page.component.html',
  styleUrl: './agent-page.component.css'
})
export class AgentPageComponent {
  
}
