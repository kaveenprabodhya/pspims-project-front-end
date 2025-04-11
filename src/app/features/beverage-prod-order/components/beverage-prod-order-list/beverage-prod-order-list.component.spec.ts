import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageProdOrderListComponent } from './beverage-prod-order-list.component';

describe('BeverageProdOrderListComponent', () => {
  let component: BeverageProdOrderListComponent;
  let fixture: ComponentFixture<BeverageProdOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageProdOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageProdOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
