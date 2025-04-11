import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopraSaleFormComponent } from './copra-sale-form.component';

describe('CopraSaleFormComponent', () => {
  let component: CopraSaleFormComponent;
  let fixture: ComponentFixture<CopraSaleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopraSaleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopraSaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
