import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageTypeListComponent } from './beverage-type-list.component';

describe('BeverageTypeListComponent', () => {
  let component: BeverageTypeListComponent;
  let fixture: ComponentFixture<BeverageTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeverageTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeverageTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
