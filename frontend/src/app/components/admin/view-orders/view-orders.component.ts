import { Component, OnInit } from '@angular/core';
import { Order, OrderResponse } from 'src/app/models/order.model';
import { OrderStatus, PaymentStatus } from 'src/app/models/order.request.model';
import { HelperService } from 'src/app/services/helper.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  orderResponse?: OrderResponse;

  constructor(private _order: OrderService, private _helper: HelperService) {}
  ngOnInit(): void {
    this._order.getAllOrders().subscribe({
      next: (value) => {
        this.orderResponse = value;
        console.log(this.orderResponse);
      },
    });
  }
}
