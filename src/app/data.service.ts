import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cycles } from './cycles';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  rentedCycles: Cycles[] = []

  getRentedCycles(): Observable<Cycles[]> {
    return of(this.rentedCycles)
  }
  
  updateRentedCycles(cycle: Cycles) {
    this.rentedCycles.push(cycle);
    // console.log(this.rentedCycles);
  }
}
