import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ManagementComponent } from './components/home/management/management.component';
import { CheckoutComponent } from './components/home/checkout/checkout.component';
import { librarianGuard } from './guards/librarian.guard';
import { AddComponent } from './components/home/management/add/add.component';
import { DetailsComponent } from './components/home/management/details/details.component';

// These are the routes for the App Module
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
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
        children: [
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: 'add', component: AddComponent },
          { path: 'details', component: DetailsComponent },
        ],
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
