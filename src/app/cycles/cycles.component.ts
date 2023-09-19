import { Component, OnInit } from '@angular/core';
import { Cycles } from '../cycles';

import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { CYCLES } from '../mock-cycles';
@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent {
  cycles : Cycles[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Cycles[]>('http://localhost:8080/api/cycle/list')
      .subscribe(cycles => {
        this.cycles = cycles;
      });
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
openCart() {
  // Open the external URL in a new tab/window when "rent" is clicked.
  window.open('http://localhost:8080/api/cart', '_blank');
}
}


