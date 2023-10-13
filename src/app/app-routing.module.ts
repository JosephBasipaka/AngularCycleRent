import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CyclesComponent } from './cycles/cycles.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { OktaAuthGuard } from '@okta/okta-angular';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  {path:'cycles', component:CyclesComponent},
  { path: 'api/cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'auth-button', component:AuthButtonComponent},
  { path: 'userPage', component:UserProfileComponent},
  { path: 'login', component:LoginComponent},
  {path:'', redirectTo: '/cycles', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
