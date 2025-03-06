import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';

const routes: Routes = [{ path: '', component: ManagementComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ManagementModule {}
