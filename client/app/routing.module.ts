import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AdminModule } from 'app/admin/admin.module';
import { MenuComponent } from 'app/admin/menu.component';
import { LandingComponent } from 'app/landing/landing.component';
import { CollectionComponent } from 'app/collection/collection.component';
import { ShoeDetailsComponent } from 'app/collection/shoeDetails/shoeDetails.component';
import { OrdersComponent } from 'app/orders/orders.component';
import { CashierComponent } from 'app/orders/cashier/cashier.component';
import { TakanonComponent } from 'app/orders/takanon/takanon.component';
import { SummaryComponent } from 'app/orders/summary/summary.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'order', component: OrdersComponent },
  { path: 'cashier', component: CashierComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: MenuComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'takanon', component: TakanonComponent },
  { path: 'summary', component: SummaryComponent },
  { path: ':query', component: CollectionComponent },
  { path: ':desc/נעל/:id/צבע/:color', component: ShoeDetailsComponent },
  { path: ':desc/נעל/:id', component: ShoeDetailsComponent },
  { path: ':company/נעלי', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
