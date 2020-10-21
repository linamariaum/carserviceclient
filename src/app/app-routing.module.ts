import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { CarWithOwnerListComponent } from './car-with-owner-list/car-with-owner-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/car-list', pathMatch: 'full' },
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: 'car-add',
    component: CarEditComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent
  },
  {
    path: 'owner-list',
    component: OwnerListComponent
  },
  {
    path: 'owner-add',
    component: OwnerEditComponent
  },
  {
    path: 'owner-edit/:id',
    component: OwnerEditComponent
  },
  {
    path: 'car-owner-list',
    component: CarWithOwnerListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
