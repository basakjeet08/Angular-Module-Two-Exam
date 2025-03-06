import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { authGuard } from './guard/auth.guard';
import { SharedModule } from '../shared/shared.module';

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
        loadChildren: () =>
          import('./management/management.module').then(
            (m) => m.ManagementModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./checkout/checkout.module').then((m) => m.CheckoutModule),
      },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(homeRoutes),
    SharedModule,
  ],
})
export class HomeModule {}
