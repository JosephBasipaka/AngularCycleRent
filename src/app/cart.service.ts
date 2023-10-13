import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from './cart';
import { Order } from './order';
import { CycleService } from './cycle.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart'; 

  constructor(private http: HttpClient,private cycleService: CycleService) {}

  // //Get cart items
  // getCartItems(): Observable<Cart[]> {
  //   return this.http.get<Cart[]>(this.apiUrl);
  // }

  // // Create orders from selected cart items
  // createOrders(orders: Order[]): Observable<any> {
  //   return this.http.post(`http://localhost:8080/api/orders`, orders);
  // }

  // // Clear the cart by deleting selected cart items
  // clearCart(selectedCartItemIds: number[]): Observable<any> {
  //   const body = JSON.stringify(selectedCartItemIds);
  //   return this.http.request('delete', 'http://localhost:8080/api/delCart', { 
  //     body,
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }

  // // Delete a single cart item
  // deleteCartItem(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }


    getCartItems(): Observable<Cart[]> {
        const headers = this.cycleService.getHeaders();
        return this.http.get<Cart[]>(this.apiUrl, { headers });
    }

  createOrders(orders: Order[]): Observable<any> {
    const headers = this.cycleService.getHeaders();
    return this.http.post(`http://localhost:8080/api/orders`, orders, { headers });
  }

  // Clear the cart by deleting selected cart items
  clearCart(selectedCartItemIds: number[]): Observable<any> {
    const header = this.cycleService.getHeaders();
    const body = JSON.stringify(selectedCartItemIds);
    return this.http.request('delete', 'http://localhost:8080/api/delCart', { 
      body,
      headers: { 'Content-Type': 'application/json', ...header }
    });
  }

  // Delete a single cart item
  deleteCartItem(id: number): Observable<any> {
    const headers = this.cycleService.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}

