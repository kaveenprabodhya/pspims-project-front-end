import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentFormComponent } from '../agent-form/agent-form.component';

@Component({
  selector: 'app-agent-list',
  imports: [CommonModule, AgentFormComponent],
  templateUrl: './agent-list.component.html',
  styleUrl: './agent-list.component.css'
})
export class AgentListComponent {
  users = [
    {
      name: 'Alice Johnson',
      role: 'Admin',
      email: 'alice@example.com',
      phone: '+1 234 567 8910',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      name: 'Alice Johnson',
      role: 'Admin',
      email: 'alice@example.com',
      phone: '+1 234 567 8910',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      name: 'Alice Johnson',
      role: 'Admin',
      email: 'alice@example.com',
      phone: '+1 234 567 8910',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      name: 'Alice Johnson',
      role: 'Admin',
      email: 'alice@example.com',
      phone: '+1 234 567 8910',
      imageUrl: 'https://via.placeholder.com/100'
    },
    {
      name: 'Bob Smith',
      role: 'User',
      email: 'bob@example.com',
      phone: '+1 234 567 8920',
      imageUrl: 'https://via.placeholder.com/100'
    },
  ];
}
