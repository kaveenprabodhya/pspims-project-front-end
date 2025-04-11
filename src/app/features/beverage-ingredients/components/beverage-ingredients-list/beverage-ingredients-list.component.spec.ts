import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageIngredientsListComponent } from './beverage-ingredients-list.component';

describe('BeverageIngredientsListComponent', () => {
  let component: BeverageIngredientsListComponent;
  let fixture: ComponentFixture<BeverageIngredientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageIngredientsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageIngredientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
