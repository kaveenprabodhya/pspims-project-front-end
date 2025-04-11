import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoconutPurchaseListComponent } from './coconut-purchase-list.component';

describe('CoconutPurchaseListComponent', () => {
  let component: CoconutPurchaseListComponent;
  let fixture: ComponentFixture<CoconutPurchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoconutPurchaseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoconutPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
