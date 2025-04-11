import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoconutwaterProdOrderFormComponent } from './coconutwater-prod-order-form.component';

describe('CoconutwaterProdOrderFormComponent', () => {
  let component: CoconutwaterProdOrderFormComponent;
  let fixture: ComponentFixture<CoconutwaterProdOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoconutwaterProdOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoconutwaterProdOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
