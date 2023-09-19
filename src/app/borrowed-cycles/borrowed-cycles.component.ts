import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-borrowed-cycles',
  templateUrl: './borrowed-cycles.component.html',
  styleUrls: ['./borrowed-cycles.component.css']
})
export class BorrowedCyclesComponent implements OnInit {
  borrowedCycles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch the list of borrowed cycles from your Spring Boot API.
    this.loadBorrowedCycles();
  }

  loadBorrowedCycles() {
    // Make an HTTP request to get the borrowed cycles data.
    // Update this URL to match your API endpoint for borrowed cycles.
    this.http.get<any[]>('http://localhost:8080/api/borrowed_cycles').subscribe((cycles) => {
      this.borrowedCycles = cycles;
    });
  }
}
