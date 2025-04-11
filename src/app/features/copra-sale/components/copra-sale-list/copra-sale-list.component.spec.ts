import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopraSaleListComponent } from './copra-sale-list.component';

describe('CopraSaleListComponent', () => {
  let component: CopraSaleListComponent;
  let fixture: ComponentFixture<CopraSaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopraSaleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopraSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
