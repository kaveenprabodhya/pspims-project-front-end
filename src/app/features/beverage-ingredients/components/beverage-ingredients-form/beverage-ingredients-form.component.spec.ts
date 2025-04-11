import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageIngredientsFormComponent } from './beverage-ingredients-form.component';

describe('BeverageIngredientsFormComponent', () => {
  let component: BeverageIngredientsFormComponent;
  let fixture: ComponentFixture<BeverageIngredientsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageIngredientsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageIngredientsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
