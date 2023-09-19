import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  rentedCycles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch the list of rented cycles from your Spring Boot API.
    this.loadRentedCycles();
  }

  loadRentedCycles() {
    // Make an HTTP request to get the rented cycles data.
    // Update this URL to match your API endpoint for rented cycles.
    this.http.get<any[]>('http://localhost:8080/api/cart').subscribe((cycles) => {
      this.rentedCycles = cycles;
    });
  }
}
