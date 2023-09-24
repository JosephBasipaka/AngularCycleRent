import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cycles } from '../cycles';
import { CyclesComponent } from '../cycles/cycles.component';
import { AppComponent } from '../app.component';
import { DataService } from '../data.service';
import { Cart } from '../cart';
import { Order } from '../order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Default value for the number of days
  cycles: Cycles[] = [];
  title = "Cart";
  cart : Cart[] = [];
  subPrice: number = 0;
  stock: number = 5;
  constructor(private http: HttpClient, private dataService: DataService) {}
  
  ngOnInit() {
    this.showRentedCycles();
  }
  showRentedCycles() {
    // Make an HTTP request to get the rented cycles data.
    // Update this URL to match your API endpoint for rented cycles.
    this.http.get<Cart[]>('http://localhost:8080/api/cart').subscribe((cycles) => {
      this.cart = cycles;
      console.log(this.cart);

    });
  }
  // Define an array to store selected cart item IDs
selectedCartItemIds: number[] = [];

// Handle checkbox change event
onCheckboxChange(event: any) {
  const cartItemId = parseInt(event.target.value);
  if (event.target.checked) {
    this.selectedCartItemIds.push(cartItemId);
  } else {
    this.selectedCartItemIds = this.selectedCartItemIds.filter(id => id !== cartItemId);
  }
}

// Calculate the total price of selected cart items
calculateTotalPrice(): number {
  let totalPrice = 0;
  for (const cart of this.cart) {
    if (this.selectedCartItemIds.includes(cart.id)) {
      totalPrice += cart.totalPrice;
    }
  }
  return totalPrice;
}


buyItems() {
  // Create orders from selected cart items
  const orders: Order[] = this.cart
    .filter(cart => this.selectedCartItemIds.includes(cart.id))
    .map(cart => ({
      cycle: cart.cycle,
      quantity: cart.quantity,
      totalPrice: cart.totalPrice,
    }));
// Send a POST request to create orders
this.http.post('http://localhost:8080/api/orders', orders).subscribe({
  next: (response: any) => {
    console.log('Orders created successfully', response);
    this.clearCart();
  },
  error: (error: any) => {
    console.error('Error creating orders', error);
  },
});


}

// clearCart() {
//   this.http
//     .delete('http://localhost:8080/api/cart', {
//       body: this.selectedCartItemIds, // Send the selectedCartItemIds for deletion
//     })
//     .subscribe(
//       (response: any) => {
//         console.log('Items removed from the cart successfully', response);
        
//   this.cart = this.cart.filter((cartItem) => !this.selectedCartItemIds.includes(cartItem.id));
//   this.selectedCartItemIds = [];
//       });
//     }
clearCart() {
  // this.http
  //   .delete('http://localhost:8080/api/cart', {
  //     body: this.selectedCartItemIds, // Send the selectedCartItemIds for deletion
  //   })
  //   .subscribe(
  //     (response: any) => {
  //       console.log('Items removed from the cart successfully', response);
        
        // Update the cart locally to remove the deleted items
        this.cart = this.cart.filter((cartItem) => !this.selectedCartItemIds.includes(cartItem.id));
        this.selectedCartItemIds = [];
    //   },
    // );
}




    
}

