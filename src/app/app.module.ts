import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

//> Angular material
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatStepperModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatGridListModule,
  MatSelectModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
//<

//> Date picker
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
//<

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './components/partials/header/header.component';
import {SnackBarComponent} from './components/partials/snack-bar/snack-bar.component';

//> Services
import {SnackBarService} from './services/snack-bar/snack-bar.service';
import {ServerService} from './services/server/server.service';
import {AuthService} from './services/auth/auth.service';
import {ServerApiService} from './services/server-api/server-api.service';
import {OrganizationsService} from './services/organizations/organizations.service';
import {ServicesService} from './services/services/services.service';
import {OrdersService} from './services/orders/orders.service';
import {UsersService} from './services/users/users.service';
import {AdminsService} from './services/admins/admins.service';
//<

import {IndexComponent as OrganizationsIndexComponent} from './components/organizations/index/index.component';
import {AddComponent as OrganizationAddComponent} from './components/organizations/add/add.component';
import {SingleComponent as OrganizationSingleComponent} from './components/organizations/single/single.component';

import {IndexComponent as ServicesIndexComponent} from './components/services/index/index.component';
import {AddComponent as ServiceAddComponent} from './components/services/add/add.component';
import {SingleComponent as ServiceSingleComponent} from './components/services/single/single.component';
import {AvailableServicesComponent} from './components/organizations/available-services/available-services.component';

import {CreateComponent as CreateOrderComponent} from './components/order/create/create.component';
import {OrganizationsComponent as OrderOrganizationsComponent} from './components/order/create/organizations/organizations.component';
import {ServicesComponent as OrderServicesComponent} from './components/order/create/services/services.component';
import {IndexComponent  as OrdersIndexComponent} from './components/order/index/index.component';

//> Users
import {IndexComponent as UsersIndexComponent} from './components/users/index/index.component';
import {LoginComponent as UsersLoginComponent} from './components/users/login/login.component';
import {RegisterComponent} from './components/users/register/register.component';
import {OrganizationsComponent as UserOwnerOrganizationsComponent} from './components/users/dashboard/organizations/organizations.component';
import {LoginComponent} from './components/admins/login/login.component';
import {HomeComponent} from './components/admins/home/home.component';
import {DashboardComponent} from './components/users/dashboard/dashboard.component';
import {OrganizationsComponent} from './components/users/dashboard/organizations/organizations.component';
//<

//> Guards
import {UsersAuthGuard} from './guards/users-auth-guard';
import {UsersGuestGuard} from './guards/users-guest-guard';
import {AdminsAuthGuard} from './guards/admins-auth-guard';
import {AdminsGuestGuard} from './guards/admins-guest-guard';
import {IsOrganizationBelongToUserGuard} from './guards/is-organization-belong-to-user-guard';
//<

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OrganizationAddComponent,
    OrganizationsIndexComponent,
    OrganizationSingleComponent,
    ServicesIndexComponent,
    ServiceAddComponent,
    ServiceSingleComponent,
    AvailableServicesComponent,
    CreateOrderComponent,
    OrderOrganizationsComponent,
    OrderServicesComponent,
    OrdersIndexComponent,
    UsersIndexComponent,
    UsersLoginComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SnackBarComponent,
    OrganizationsComponent,
    UserOwnerOrganizationsComponent
  ],
  entryComponents: [
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatStepperModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatGridListModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatSnackBarModule,
    CdkTableModule,

  ],
  providers: [
    ServerService,
    AuthService,
    SnackBarService,
    ServerApiService,
    OrganizationsService,
    ServicesService,
    OrdersService,
    UsersService,
    AdminsService,
    FormBuilder,
    CookieService,
    UsersAuthGuard,
    UsersGuestGuard,
    AdminsAuthGuard,
    AdminsGuestGuard,
    IsOrganizationBelongToUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
