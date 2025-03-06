import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ManagementComponent } from './components/home/management/management.component';
import { CheckoutComponent } from './components/home/checkout/checkout.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent, ManagementComponent, CheckoutComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
