import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  user?: User;
  orderResponse: OrderResponse = {
    content: [],
    lastPage: true,
    pageNumber: 0,
    pageSize: 999999,
    totalElements: 999999,
    totalPages: 1,
  };
  constructor(private _auth: AuthService, private _order: OrderService) {
    this._auth.getLoggedInData().subscribe({
      next: (data) => {
        this.user = data.user;
      },
    });
  }
  ngOnInit(): void {
    if (this.user) {
      this._order.getOrderOfUser(this.user.userId).subscribe({
        next: (orderReponse) => {
          this.orderResponse.content = orderReponse.sort((a, b) => {
            return Number(b.orderedDate) - Number(a.orderedDate);
          });

          console.log(this.orderResponse.content);
        },
      });
    }
  }
}
