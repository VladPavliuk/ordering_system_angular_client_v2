import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

//> Orgnizations
import {IndexComponent as OrganizationsIndexComponent} from './components/organizations/index/index.component';
import {AddComponent as OrganizationAddComponent} from './components/organizations/add/add.component';
import {SingleComponent as OrganizationSingleComponent} from './components/organizations/single/single.component';
import {AvailableServicesComponent as OrganizationAvailableServicesComponent} from './components/organizations/available-services/available-services.component';
//<

//> Services
import {IndexComponent as ServicesIndexComponent} from './components/services/index/index.component';
import {AddComponent as ServiceAddComponent} from './components/services/add/add.component';
import {SingleComponent as ServiceSingleComponent} from './components/services/single/single.component';
//<

//> Orders
import {CreateComponent as CreateOrderComponent} from './components/order/create/create.component';
import {IndexComponent as OrdersIndexComponent} from './components/order/index/index.component';
//<

//> Users
import {IndexComponent as UsersIndexComponent} from './components/users/index/index.component';
import {LoginComponent as UsersLoginComponent} from './components/users/login/login.component';
import {DashboardComponent as UsersDashboardComponent } from './components/users/dashboard/dashboard.component';
//<

//>Admins
import {LoginComponent as AdminLoginComponent} from './components/admins/login/login.component';
import {HomeComponent as AdminHomeComponent} from './components/admins/home/home.component';
//<

//> Guards
import {UsersAuthGuard} from './guards/users-auth-guard';
import {AdminsAuthGuard} from './guards/admins-auth-guard';
import {AdminsGuestGuard} from './guards/admins-guest-guard';
//<

const routes: Routes = [

  {path: '', redirectTo: '/order', pathMatch: 'full'},

  {path: 'organizations-list', component: OrganizationsIndexComponent, canActivate: [AdminsAuthGuard]},
  {path: 'organization-add', component: OrganizationAddComponent, canActivate: [AdminsAuthGuard]},
  {path: 'organization/:id', component: OrganizationSingleComponent, canActivate: [AdminsAuthGuard]},
  {path: 'organization/:id/available-services', component: OrganizationAvailableServicesComponent},

  {path: 'services-list', component: ServicesIndexComponent, canActivate: [AdminsAuthGuard]},
  {path: 'service-add', component: ServiceAddComponent, canActivate: [AdminsAuthGuard]},
  {path: 'service/:id', component: ServiceSingleComponent, canActivate: [AdminsAuthGuard]},

  {path: 'order', component: CreateOrderComponent},
  {path: 'orders', component: OrdersIndexComponent, canActivate: [AdminsAuthGuard]},

  {path: 'home', component: UsersDashboardComponent, canActivate: [UsersAuthGuard]},
  {path: 'users', component: UsersIndexComponent, canActivate: [AdminsAuthGuard]},
  {path: 'login', component: UsersLoginComponent},

  {path: 'admin/login', component: AdminLoginComponent, canActivate: [AdminsGuestGuard]},
  {path: 'admin/home', component: AdminHomeComponent, canActivate: [AdminsAuthGuard]},

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
