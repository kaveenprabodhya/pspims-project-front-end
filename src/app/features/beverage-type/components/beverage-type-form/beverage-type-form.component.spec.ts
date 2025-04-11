import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageTypeFormComponent } from './beverage-type-form.component';

describe('BeverageTypeFormComponent', () => {
  let component: BeverageTypeFormComponent;
  let fixture: ComponentFixture<BeverageTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
