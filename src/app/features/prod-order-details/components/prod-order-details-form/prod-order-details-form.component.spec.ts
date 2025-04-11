import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOrderDetailsFormComponent } from './prod-order-details-form.component';

describe('ProdOrderDetailsFormComponent', () => {
  let component: ProdOrderDetailsFormComponent;
  let fixture: ComponentFixture<ProdOrderDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdOrderDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdOrderDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
