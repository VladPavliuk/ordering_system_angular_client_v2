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
import {SingleComponent as OrderSingleComponent} from './components/order/single/single.component';
//<

//> Users
import {IndexComponent as UsersIndexComponent} from './components/users/index/index.component';
import {LoginComponent as UsersLoginComponent} from './components/users/login/login.component';
import {DashboardComponent as UsersDashboardComponent} from './components/users/dashboard/dashboard.component';
import {SignupComponent as UserSignupComponent} from './components/users/signup/signup.component';
//<

//>Admins
import {LoginComponent as AdminLoginComponent} from './components/admins/login/login.component';
import {HomeComponent as AdminHomeComponent} from './components/admins/home/home.component';
//<

//> Guards
import {UsersAuthGuard} from './guards/users-auth-guard';
import {UsersGuestGuard} from './guards/users-guest-guard';
import {AdminsAuthGuard} from './guards/admins-auth-guard';
import {AdminsGuestGuard} from './guards/admins-guest-guard';
import {IsOrganizationBelongToUserGuard} from './guards/is-organization-belong-to-user-guard';
//<

const routes: Routes = [

  {path: '', redirectTo: '/order', pathMatch: 'full'},

  {path: 'organizations-list', component: OrganizationsIndexComponent, canActivate: [UsersAuthGuard]},
  {path: 'organization-add', component: OrganizationAddComponent, canActivate: [UsersAuthGuard]},
  {path: 'organization/:id', component: OrganizationSingleComponent, canActivate: [UsersAuthGuard]},
  {
    path: 'organization/:id/available-services',
    component: OrganizationAvailableServicesComponent,
    canActivate: [IsOrganizationBelongToUserGuard]
  },

  {path: 'services-list', component: ServicesIndexComponent, canActivate: [UsersAuthGuard]},
  {path: 'service-add', component: ServiceAddComponent, canActivate: [UsersAuthGuard]},
  {path: 'service/:id', component: ServiceSingleComponent, canActivate: [UsersAuthGuard]},

  {path: 'order', component: CreateOrderComponent},
  {path: 'orders', component: OrdersIndexComponent, canActivate: [UsersAuthGuard]},
  {path: 'order/:id', component: OrderSingleComponent, canActivate: [UsersAuthGuard]},

  {path: 'home', component: UsersDashboardComponent, canActivate: [UsersAuthGuard]},
  {path: 'users', component: UsersIndexComponent, canActivate: [UsersAuthGuard]},
  {path: 'login', component: UsersLoginComponent, canActivate: [UsersGuestGuard]},
  {path: 'signup', component: UserSignupComponent, canActivate: [UsersGuestGuard]},

  {path: 'admin/login', component: AdminLoginComponent, canActivate: [AdminsGuestGuard]},
  {path: 'admin/home', component: AdminHomeComponent, canActivate: [UsersAuthGuard]},

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
