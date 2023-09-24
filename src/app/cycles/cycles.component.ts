import { Component, OnInit } from '@angular/core';
import { Cycles } from '../cycles';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

//import { CYCLES } from '../mock-cycles';
@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent {
  title = "Cycle Shop";
  cycles : Cycles[] = [];
  rentedCycles: Cycles[] = [];
  id : number = 1;
  totalPrice: number = 0;
  numberOfDays: number = 1;
  
  constructor(private http: HttpClient,private dataService: DataService) {}

  ngOnInit() {
    this.http.get<Cycles[]>('http://localhost:8080/api/cycle/list')
      .subscribe(cycles => {
        this.cycles = cycles;
        console.log(cycles);
      });
      // this.loadRentedCycles();
  }
  onRestock(id: number,value: string) {
    let numVal = 0;
    if(value!="")
      numVal = parseInt(value);
    const path = 'http://localhost:8080/api';
    const followpath = 'restock';
    const mainpath = `${path}/${id}/${followpath}?count=${numVal}`;

  
    this.http.post<Cycles[]>(mainpath,null).subscribe(cycles => {
      this.cycles = cycles;
    });
}
  onReturn(id:number,value:string){
    let numVal = 0;
    if(value!="")
      numVal = parseInt(value);
      const requestheaders = new HttpHeaders({
        'Content-Type' : 'application/json'
      });
      const path = 'http://localhost:8080/api';
      const followpath = 'return';
    const mainpath = `${path}/${id}/${followpath}?count=${numVal}`;
    this.http.post<Cycles[]>(mainpath,null,{
        responseType : 'json'
      }).subscribe(cycles => {
      this.cycles = cycles;

    });
  }
onBorrow(id: number,value : string) {
  let numVal = 0;
    if(value!="")
      numVal = parseInt(value);
      const requestheaders = new HttpHeaders({
        'Content-Type' : 'application/json'
      });
      const path = 'http://localhost:8080/api';
      const followpath = 'borrow';
      const mainpath = `${path}/${id}/${followpath}?count=${numVal}`;
      this.http.post<Cycles[]>(mainpath,null,{
        responseType : 'json'
      }).subscribe(cycles => {
        this.cycles = cycles;
        
      });
    }
    // loadRentedCycles() {
  onRent(id: number, value: string) {
    let numVal = 0;
    if (value != "") {
      numVal = parseInt(value);
    }
    const requestheaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    const path = 'http://localhost:8080/api';
    const followpath = 'rent';
    const mainpath = `${path}/${id}/${followpath}?count=${numVal}`;
    
    this.http.post<Cycles[]>(mainpath,null,{
      responseType : 'json'
    }).subscribe(cycles => {
    this.cycles = cycles;
  });
  }
//   // Make an HTTP request to get the rented cycles data.
//   // Update this URL to match your API endpoint for rented cycles.
//   this.http.get<Cycles[]>('http://localhost:8080/api/cart').subscribe((cycles) => {
//     this.rentedCycles = cycles;
//     this.calculateTotalPrice();
//   });
// }
// calculateTotalPrice() {
//   this.totalPrice = this.numberOfDays * 50;
// }
// onNumberOfDaysChange() {
//   this.calculateTotalPrice();
// }

   
// openCart(id: number):void {
//   const selectedCycle = this.cycles.find(cycle => cycle.id === id);
//   if (selectedCycle) {
//     this.rentedCycles.push(selectedCycle);
//     this.dataService.updateRentedCycles(selectedCycle);
//     localStorage.setItem("cart",JSON.stringify(selectedCycle))
//     console.log(selectedCycle);
//     console.log(this.rentedCycles);
//     }
//     window.open('http://localhost:4200/api/cart', '_blank');
  
// }
// }
// openCart(id: number, quantity: number): void {
//   this.addToCart(id, quantity);
// }

// private addToCart(id: number, quantity: number): void {
//   this.http.post('http://localhost:8080/api/cart/add', { cycleId: id, quantity }).subscribe(() => {
//     this.loadRentedCycles();
//   });
// }

// loadRentedCycles() {
//   this.http.get<Cycles[]>('http://localhost:8080/api/cycle/list').subscribe(cycles => {
//     this.rentedCycles = cycles;
//     // this.calculateTotalPrice();
//   });
// }

calculatePrice() {
  this.totalPrice = this.rentedCycles.reduce((total, cycle) => total + (cycle.price * cycle.quantity), 0);
}

}
