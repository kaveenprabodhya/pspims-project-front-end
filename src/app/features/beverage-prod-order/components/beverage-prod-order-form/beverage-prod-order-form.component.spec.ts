import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageProdOrderFormComponent } from './beverage-prod-order-form.component';

describe('BeverageProdOrderFormComponent', () => {
  let component: BeverageProdOrderFormComponent;
  let fixture: ComponentFixture<BeverageProdOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageProdOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageProdOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
