import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];
  selectedOrder: Order | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    const apiUrl = 'http://localhost:8080/api/orders'; 
    this.http.get<Order[]>(apiUrl).subscribe((orders) => {
      this.orders = orders;
    });
  }

  onSelectOrder(order: Order) {
    this.selectedOrder = order;
  }
}
