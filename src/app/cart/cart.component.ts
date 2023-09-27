import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { Cycles } from '../cycles';
import { CartService } from '../cart.service';
import { Order } from '../order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cycles: Cycles[] = [];
  title = "Cart";
  cart: Cart[] = [];
  selectedCartItemIds: number[] = [];

  constructor(private cartService: CartService) {} 

  ngOnInit() {
    this.showRentedCycles();
  }

  showRentedCycles() {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cart = cartItems;
      console.log(this.cart);
    });
  }
  
  onCheckboxChange(event: any) {
    const cartItemId = parseInt(event.target.value);
    if (event.target.checked) {
      this.selectedCartItemIds.push(cartItemId);
    } else {
      this.selectedCartItemIds = this.selectedCartItemIds.filter(id => id !== cartItemId);
    }
  }

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
        returned: false
      }));

    this.cartService.createOrders(orders).subscribe({
      next: (response: any) => {
        console.log('Orders created successfully', response);
        this.clearCart();
      },
      error: (error: any) => {
        console.error('Error creating orders', error);
      },
    });
  }

  //Total Cart
  clearCart() {
    this.cartService.clearCart(this.selectedCartItemIds).subscribe(
      (response: any) => {
        console.log('Items removed from the cart successfully', response);
        this.cart = this.cart.filter((cartItem) => !this.selectedCartItemIds.includes(cartItem.id));
        this.selectedCartItemIds = [];
      },
    );
  }

  incrementQuantity(cartItem: Cart) {
    cartItem.quantity++;
    cartItem.totalPrice = cartItem.cycle.price * cartItem.quantity;
  }

  decrementQuantity(cartItem: Cart) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.totalPrice = cartItem.cycle.price * cartItem.quantity;
    }
  }

  //Single Item
  removeItemFromCart(cartItem: Cart) {
    const cartItemId = cartItem.id;
    this.cartService.deleteCartItem(cartItemId).subscribe(
      (response: any) => {
        console.log('Item removed from cart successfully', response);
        const index = this.cart.findIndex((item) => item.id === cartItemId);
        if (index !== -1) {
          this.cart.splice(index, 1);
        }
      }
    );
  }
}
