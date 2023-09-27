import { Component, OnInit } from '@angular/core';
import { Cycles } from '../cycles';
import { CycleService } from '../cycle.service';

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent implements OnInit {
  title = "Cycle Shop";
  cycles: Cycles[] = [];
  rentedCycles: Cycles[] = [];
  id: number = 1;
  totalPrice: number = 0;
  numberOfDays: number = 1;

  constructor(private cycleService: CycleService) {}

  ngOnInit() {
    this.loadCycles();
  }

  loadCycles() {
    this.cycleService.getCycles().subscribe((cycles) => {
      this.cycles = cycles;
    });
  }

  onRestock(id: number, value: string) {
    let numVal = 0;
    if (value !== "") numVal = parseInt(value);
    
    this.cycleService.restockCycle(id, numVal).subscribe((cycles) => {
      this.cycles = cycles;
    });
  }

  onReturn(id: number, value: string) {
    let numVal = 0;
    if (value !== "") numVal = parseInt(value);

    this.cycleService.returnCycle(id, numVal).subscribe((cycles) => {
      this.cycles = cycles;
    });
  }

  onBorrow(id: number, value: string) {
    let numVal = 0;
    if (value !== "") numVal = parseInt(value);

    this.cycleService.borrowCycle(id, numVal).subscribe((cycles) => {
      this.cycles = cycles;
    });
  }

  onRent(id: number, value: string) {
    let numVal = 1;
    if (value !== "") {
      numVal = parseInt(value);
    }

    this.cycleService.rentCycle(id, numVal).subscribe((cycles) => {
      this.cycles = cycles;
    });
  }
}
