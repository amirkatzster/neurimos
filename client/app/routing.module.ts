import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
import { FindusComponent } from 'app/info/findus/findus.component';
import { SendusmsgComponent } from 'app/info/sendusmsg/sendusmsg.component';
import { AboutComponent } from 'app/info/about/about.component';
import { ShoeEditComponent } from 'app/admin/shoes/shoeEdit/shoeEdit.component';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { ShoeSizesComponent } from 'app/info/shoe_sizes/shoe-sizes.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'order', component: OrdersComponent },
  { path: 'cashier', component: CashierComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin/shoeedit/:id', component: ShoeEditComponent, canActivate: [AuthGuardAdmin] },
  { path: 'admin/shoeedit', component: ShoeEditComponent, canActivate: [AuthGuardAdmin] },
  { path: 'admin', component: MenuComponent, canActivate: [AuthGuardAdmin] },
  { path: 'findus', component: FindusComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sendusmsg', component: SendusmsgComponent },
  { path: 'takanon', component: TakanonComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'סרגל_מידות', component: ShoeSizesComponent },
  { path: 'נעלי/:query', component: CollectionComponent },
  { path: 'נעל/:desc/:id/צבע/:color', component: ShoeDetailsComponent },
  // { path: 'c/:company/נעלי', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
