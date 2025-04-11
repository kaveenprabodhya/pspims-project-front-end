import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageTypePageComponent } from './beverage-type-page.component';

describe('BeverageTypePageComponent', () => {
  let component: BeverageTypePageComponent;
  let fixture: ComponentFixture<BeverageTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageTypePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
