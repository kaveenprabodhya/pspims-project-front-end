import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoconutwaterProdOrderListComponent } from './coconutwater-prod-order-list.component';

describe('CoconutwaterProdOrderListComponent', () => {
  let component: CoconutwaterProdOrderListComponent;
  let fixture: ComponentFixture<CoconutwaterProdOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoconutwaterProdOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoconutwaterProdOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
