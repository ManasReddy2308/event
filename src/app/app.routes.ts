import { Routes } from '@angular/router';
import {Landing} from './landing/landing';
import { RegisterComponent} from './auth/register/register';
import { LoginComponent } from './auth/login/login';
import{Profile} from './user/profile/profile';
import { DashboardComponent} from './user/dashboard/dashboard';
import { RegisteredEventsComponent } from './user/registered-events/registered-events';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { ManageUsersComponent} from './admin/manage-users/manage-users';
import { ManageEventsComponent } from './admin/manage-events/manage-events';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile';
export const routes: Routes = [
    {path:'', component:Landing},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'profile',component:Profile},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'registered-events', component: RegisteredEventsComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/users', component: ManageUsersComponent },
  { path: 'admin/events', component: ManageEventsComponent },
  { path: 'admin/profile', component: AdminProfileComponent}
];
