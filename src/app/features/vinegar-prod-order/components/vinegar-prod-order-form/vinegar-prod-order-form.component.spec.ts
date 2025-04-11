import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinegarProdOrderFormComponent } from './vinegar-prod-order-form.component';

describe('VinegarProdOrderFormComponent', () => {
  let component: VinegarProdOrderFormComponent;
  let fixture: ComponentFixture<VinegarProdOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinegarProdOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinegarProdOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
