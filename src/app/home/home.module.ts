import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddComponent } from './components/management/add/add.component';
import { DetailsComponent } from './components/management/details/details.component';
import { ManagementComponent } from './components/management/management.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { authGuard } from './guard/auth.guard';
import { librarianGuard } from './guard/librarian.guard';

// These are the routes for the home
const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'checkout', pathMatch: 'full' },
      {
        path: 'management',
        component: ManagementComponent,
        canActivate: [librarianGuard],
        children: [
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: 'add/:id', component: AddComponent },
          { path: 'details', component: DetailsComponent },
        ],
      },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    CheckoutComponent,
    ManagementComponent,
    AddComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
