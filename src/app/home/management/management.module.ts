import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { AddComponent } from './components/add/add.component';
import { DetailsComponent } from './components/details/details.component';
import { librarianGuard } from '../guard/librarian.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

// These are the management routes
const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    canActivate: [librarianGuard],
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'add', component: AddComponent },
      { path: 'details', component: DetailsComponent },
    ],
  },
];

@NgModule({
  declarations: [ManagementComponent, AddComponent, DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ],
})
export class ManagementModule {}
