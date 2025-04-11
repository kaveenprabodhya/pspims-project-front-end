import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinegarProdOrderListComponent } from './vinegar-prod-order-list.component';

describe('VinegarProdOrderListComponent', () => {
  let component: VinegarProdOrderListComponent;
  let fixture: ComponentFixture<VinegarProdOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinegarProdOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinegarProdOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
