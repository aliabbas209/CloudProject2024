import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewModalComponent } from './order-view-modal.component';

describe('OrderViewModalComponent', () => {
  let component: OrderViewModalComponent;
  let fixture: ComponentFixture<OrderViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderViewModalComponent]
    });
    fixture = TestBed.createComponent(OrderViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
