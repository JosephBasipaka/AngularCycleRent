import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order';
import { CycleService } from './cycle.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient,private cycleServie: CycleService) {}

  // loadOrders(): Observable<Order[]>{
  //   return this.http.get<Order[]>(this.apiUrl);
  // }
  // markOrderAsReturned(orderId: number): Observable<any> {
  //   const url = `${this.apiUrl}/${orderId}/return`;
  //   return this.http.put(url, {});
  // }
  loadOrders(): Observable<Order[]> {
    const headers = this.cycleServie.getHeaders();
    return this.http.get<Order[]>(this.apiUrl, { headers });
  }

  markOrderAsReturned(orderId: number): Observable<any> {
    const headers = this.cycleServie.getHeaders();
    const url = `${this.apiUrl}/${orderId}/return`;
    return this.http.put(url, {}, { headers });
  }
}
