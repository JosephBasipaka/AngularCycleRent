import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { CycleService } from '../cycle.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {
  constructor(public auth : AuthService, private cycleService : CycleService ){}

  // const idToken: Observable<any | null | undefined>;
   Token: string | null | undefined = null;
   username : string | null | undefined = null;

  // logout(){
  //   this.auth.logout({logoutParams : { redirect_uri : window.location.origin + '/cycles' }});
  // }
  
  // getIdToken(): Observable<any> | null {
  //   // console.log(this.auth.getAccessTokenWithPopup);
  //   // localStorage.getItem(JSON.stringify(this.auth.idTokenClaims$));
  //   // localStorage.getItem(JSON.stringify(this.auth.getAccessTokenSilently));
  //   // localStorage.getItem(JSON.stringify(this.auth.getAccessTokenWithPopup));
  //   // return this.auth.idTokenClaims$;

  //   const idToken = this.auth.idTokenClaims$;

  //   if (idToken) {
  //     localStorage.setItem('idToken', idToken);
  //   }

  //   return idToken;
  // }


  // async ngOnInit(){
  //   // const userClaims = await this.auth.geTokenClaims$();
  //   this.auth.
  // }
  ngOnInit() {
    this.auth.idTokenClaims$.subscribe(idToken => {
        // console.log(idToken?.__raw);
      if (idToken) {
        this.Token = idToken.__raw.toString();
        this.username = idToken.email || '';
        console.log("name: " + this.username)
        localStorage.setItem('idToken', this.Token);
        localStorage.setItem('name', this.username);
        this.cycleService.setToken(this.Token,this.username)
      }
    });
  }
  // afterLoginActions() {
  //   // Add your code here
  //   console.log('User is logged in!');
  //   // You can perform any additional actions you need after a successful login.
  // }
  // // Access the ID Token
  // getAccessToken(): [Observable<any>, detailedResponse : true] {
  //   return this.auth.id;
  // }
}
