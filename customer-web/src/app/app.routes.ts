import { Routes } from '@angular/router';
import { HomeComponent } from './customer/home/home.component';

export const routes: Routes = [
  {path:"customer/home", component:HomeComponent},
  {path:"customer",redirectTo:"customer/home", pathMatch:"full" },
  {path:"", redirectTo:"customer/home", pathMatch:"full"}
];
