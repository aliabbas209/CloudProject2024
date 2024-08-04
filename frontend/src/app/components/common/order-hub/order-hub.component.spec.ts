import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHubComponent } from './order-hub.component';

describe('OrderHubComponent', () => {
  let component: OrderHubComponent;
  let fixture: ComponentFixture<OrderHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHubComponent]
    });
    fixture = TestBed.createComponent(OrderHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
