import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../models/order.request.model';
import { environment } from 'src/environments/environment';
import { Order, OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _http: HttpClient) {}

  createOrder(orderRequest: OrderRequest) {
    return this._http.post<Order>(`${environment.apiUrl}/orders`, orderRequest);
  }

  getAllOrders(
    pageNumber = 0,
    pageSize = 10,
    sortBy = 'orderedDate',
    sortDir = 'desc'
  ) {
    return this._http.get<OrderResponse>(
      `${environment.apiUrl}/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  }

  getOrderOfUser(userId: string) {
    return this._http.get<Order[]>(
      `${environment.apiUrl}/orders/users/${userId}`
    );
  }

  updateOrder(order: Order) {
    return this._http.put<Order>(
      `${environment.apiUrl}/orders/${order.orderId}`,
      order
    );
  }
}
