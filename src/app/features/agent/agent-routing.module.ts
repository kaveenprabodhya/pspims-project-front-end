import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentPageComponent } from './pages/agent-page/agent-page.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentMainComponent } from './components/agent-main/agent-main.component';
import { AgentMyProfileComponent } from './components/agent-my-profile/agent-my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AgentPageComponent,
    children: [
      { path: 'my-profile', component: AgentMyProfileComponent },
      { path: '', redirectTo: 'my-profile', pathMatch: 'full' },
      {
        path: 'main',
        component: AgentMainComponent,
        children: [
          { path: 'list', component: AgentListComponent },
          { path: 'form/:id', component: AgentFormComponent },
          { path: 'form', component: AgentFormComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {}
