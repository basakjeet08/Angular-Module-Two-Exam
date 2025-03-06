import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/management/add/add.component';
import { DetailsComponent } from './components/management/details/details.component';
import { ManagementComponent } from './components/management/management.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { authGuard } from './guard/auth.guard';
import { librarianGuard } from './guard/librarian.guard';
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
        component: ManagementComponent,
        canActivate: [librarianGuard],
        children: [
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: 'add', component: AddComponent },
          { path: 'details', component: DetailsComponent },
        ],
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
  declarations: [
    HomeComponent,
    ManagementComponent,
    AddComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(homeRoutes),
    SharedModule,
  ],
})
export class HomeModule {}
