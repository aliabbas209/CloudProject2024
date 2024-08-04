import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderResponse } from 'src/app/models/order.model';
import { OrderStatus, PaymentStatus } from 'src/app/models/order.request.model';
import { HelperService } from 'src/app/services/helper.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-hub',
  templateUrl: './order-hub.component.html',
  styleUrls: ['./order-hub.component.css'],
})
export class OrderHubComponent {
  orderStatus = OrderStatus;
  paymentStatus = PaymentStatus;

  @Input() orderResponse?: OrderResponse;

  constructor(private _order: OrderService, private _helper: HelperService) {}
  ngOnInit(): void {
    // this._order.getAllOrders().subscribe({
    //   next: (value) => {
    //     this.orderResponse = value;
    //     console.log(this.orderResponse);
    //   },
    // });
  }

  // open view order modal
  openModal(order: Order) {
    this._helper.emitOrderEvent(order);
  }
}
