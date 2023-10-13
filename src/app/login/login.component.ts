import { Component } from '@angular/core';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user : string | undefined | null = '' ;
  constructor(private authService : AuthService){}


  ngOnInit(){
    this.user = localStorage.getItem('username');
  }
  login(username : string, password : string) : void {
    this.authService.login(username, password).subscribe(res => {
      console.log("going...")
    });
    // window.location.href = "http://localhost:4200";
  }
}
