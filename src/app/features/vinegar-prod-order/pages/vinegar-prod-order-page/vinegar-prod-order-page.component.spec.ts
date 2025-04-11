import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinegarProdOrderPageComponent } from './vinegar-prod-order-page.component';

describe('VinegarProdOrderPageComponent', () => {
  let component: VinegarProdOrderPageComponent;
  let fixture: ComponentFixture<VinegarProdOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinegarProdOrderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinegarProdOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
