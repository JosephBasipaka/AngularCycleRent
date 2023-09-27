import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];
  selectedOrder: Order | undefined;

  constructor(private http: HttpClient, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.loadOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(JSON.stringify(orders));
    });
  }

  onSelectOrder(order: Order) {
    this.selectedOrder = order;
  }
  returnOrder(order: Order) {
    const orderId = order.id;
    if(orderId !== undefined){
    this.orderService.markOrderAsReturned(orderId).subscribe(() => {
      order.returned = true;
      const remainingBalance = this.calculateRemainingBalance(order);
      console.log('Remaining Balance:', remainingBalance);
    });
    }
  }

  calculateRemainingBalance(order: Order): number {
    var remainingBalance = 0;
    const currentDate = new Date();
    if(order.orderDate){
      const orderDate = new Date(order.orderDate);
      const timeDifference = currentDate.getTime() - orderDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      const dailyRate = order.totalPrice; 
      const totalRate = dailyRate * daysDifference;
      remainingBalance = totalRate - order.totalPrice;
    }
    return remainingBalance;
    
  }
}
