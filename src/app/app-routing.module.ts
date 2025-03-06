import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ManagementComponent } from './components/home/management/management.component';
import { CheckoutComponent } from './components/home/checkout/checkout.component';
import { librarianGuard } from './guards/librarian.guard';

// These are the routes for the App Module
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'checkout', pathMatch: 'full' },
      {
        path: 'management',
        component: ManagementComponent,
        canActivate: [librarianGuard],
      },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
