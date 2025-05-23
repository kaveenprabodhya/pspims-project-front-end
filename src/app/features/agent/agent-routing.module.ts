import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentPageComponent } from './pages/agent-page/agent-page.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentMainComponent } from './components/agent-main/agent-main.component';

const routes: Routes = [
  {
    path: '',
    component: AgentPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'main', component: AgentMainComponent },
      { path: 'list', component: AgentListComponent },
      { path: 'form', component: AgentFormComponent },
      { path: 'form/:id', component: AgentFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
