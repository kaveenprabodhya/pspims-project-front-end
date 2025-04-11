import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageIngredientsPageComponent } from './beverage-ingredients-page.component';

describe('BeverageIngredientsPageComponent', () => {
  let component: BeverageIngredientsPageComponent;
  let fixture: ComponentFixture<BeverageIngredientsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageIngredientsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageIngredientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
