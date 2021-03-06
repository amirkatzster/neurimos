import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as ngCore from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoeService } from './services/shoe.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ClassificationService } from './services/classification.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminModule } from './admin/admin.module';
import { LandingComponent } from './landing/landing.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionShoeComponent } from './collection/collectionShoe/collectionShoe.component';
import { ShoeDetailsComponent } from './collection/shoeDetails/shoeDetails.component';
import { OrderService } from 'app/services/order.service';
import { OrdersComponent } from './orders/orders.component';
import { CashierComponent } from 'app/orders/cashier/cashier.component';
import { TakanonComponent } from 'app/orders/takanon/takanon.component';
import { SummaryComponent } from 'app/orders/summary/summary.component';
import { FindusComponent } from 'app/info/findus/findus.component';
import { SendusmsgComponent } from 'app/info/sendusmsg/sendusmsg.component';
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from 'app/info/about/about.component';
import { ContactUsService } from 'app/services/contactus.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './shared/safeHtml/safe-html';
import { ShoeSizesComponent } from 'app/info/shoe_sizes/shoe-sizes.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    NotFoundComponent,
    LandingComponent,
    CollectionComponent,
    CollectionShoeComponent,
    ShoeDetailsComponent,
    OrdersComponent,
    CashierComponent,
    TakanonComponent,
    SummaryComponent,
    FindusComponent,
    SendusmsgComponent,
    ShoeSizesComponent,
    SafeHtmlPipe
  ],
  imports: [
    RoutingModule,
    SharedModule,
    AdminModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdfSnui6ck0WUOBT-Q9wa1zoDcdoUFH5k'
    }),
    BrowserModule.withServerTransition({appId: 'neurim-app'})
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    ShoeService,
    ClassificationService,
    UserService,
    OrderService,
    ContactUsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})


export class AppModule { }
