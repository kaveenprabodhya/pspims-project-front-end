import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMyProfileComponent } from './agent-my-profile.component';

describe('AgentMyProfileComponent', () => {
  let component: AgentMyProfileComponent;
  let fixture: ComponentFixture<AgentMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentMyProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
