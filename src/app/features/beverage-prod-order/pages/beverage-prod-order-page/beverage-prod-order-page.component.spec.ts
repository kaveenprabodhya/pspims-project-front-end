import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageProdOrderPageComponent } from './beverage-prod-order-page.component';

describe('BeverageProdOrderPageComponent', () => {
  let component: BeverageProdOrderPageComponent;
  let fixture: ComponentFixture<BeverageProdOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageProdOrderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageProdOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
