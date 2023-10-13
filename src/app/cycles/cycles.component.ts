import { Component, OnInit } from '@angular/core';
import { Cycles } from '../cycles';
import { CycleService } from '../cycle.service';
import jwtDecode from 'jwt-decode';
import { Token } from '../Token';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent implements OnInit { 
  username: string = '';
  title = "Cycle Shop";
  cycles: Cycles[] = [];
  rentedCycles: Cycles[] = [];
  id: number = 1;
  totalPrice: number = 0;
  numberOfDays: number = 1;

  constructor(private cycleService: CycleService, private auth: AuthService) {}

  ngOnInit() {
    try {
      const tokenGen = localStorage.getItem('browser-tabs-lock-key-auth0.lock.getTokenSilently');
      if (tokenGen) {
        const decodedToken = jwtDecode<Token>(tokenGen);
        if (decodedToken && decodedToken.username) {
          this.username = decodedToken.username;
          console.log('user'+ this.username);
        } else {
          console.error('Token does not contain the username claim.');
        }
      }
    } catch (error) {
      console.error('Error decoding or processing the token:', error);
    }
    
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

  setToken(){
    this.auth.idTokenClaims$.subscribe(idToken => {
    if (idToken) {
      const token = idToken.__raw.toString();
      const name = idToken.email || '';
    this.cycleService.setToken(token,name);
  }})
}
}
