import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ManagementComponent } from './components/home/management/management.component';
import { CheckoutComponent } from './components/home/checkout/checkout.component';
import { AddComponent } from './components/home/management/add/add.component';
import { DetailsComponent } from './components/home/management/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManagementComponent,
    CheckoutComponent,
    AddComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
