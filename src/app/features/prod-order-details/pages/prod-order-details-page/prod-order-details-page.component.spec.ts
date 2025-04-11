import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdOrderDetailsPageComponent } from './prod-order-details-page.component';

describe('ProdOrderDetailsPageComponent', () => {
  let component: ProdOrderDetailsPageComponent;
  let fixture: ComponentFixture<ProdOrderDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdOrderDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdOrderDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
