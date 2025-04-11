import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOrderDetailsListComponent } from './prod-order-details-list.component';

describe('ProdOrderDetailsListComponent', () => {
  let component: ProdOrderDetailsListComponent;
  let fixture: ComponentFixture<ProdOrderDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdOrderDetailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdOrderDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
