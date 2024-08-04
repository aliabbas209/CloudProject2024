import { EventEmitter, Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public openOrderModalEmitter=new EventEmitter<Order>()
  emitOrderEvent(order:Order){
    this.openOrderModalEmitter.next(order)

  }
}
