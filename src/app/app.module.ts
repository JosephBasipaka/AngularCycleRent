import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CyclesComponent } from './cycles/cycles.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { DataService } from './data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthModule } from '@auth0/auth0-angular';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { Router } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogoutComponent } from './logout/logout.component';
// import myAppConfig from 'src/config/my-app-config';
;
// import { Router } from '@angular/router';

// const oktaConfig = Object.assign({
//   onAuthRequired: (oktaAuth: any, injector : Injector) => {
//     const router = injector.get(Router);
//     router.navigate(['/login']);
//   }
// }, myAppConfig.oidc)

@NgModule({
  declarations: [
    AppComponent,
    CyclesComponent,
    CartComponent,
    NavbarComponent,
    OrdersComponent,
    UserProfileComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // OktaAuthModule,
    // Location,
    // Router,
    AuthModule.forRoot({
      domain: 'dev-kwefsaqtxp3308ed.us.auth0.com',
      clientId: 'IWJFJQ3Zs09vIgydNIXeOow0DFNA4jDW',
      authorizationParams: {
        redirect_uri: window.location.origin + '/auth-button'
      }
    }),
  ],

  providers: [
    DataService,
    // { provide: OKTA_CONFIG, useValue: oktaConfig}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
