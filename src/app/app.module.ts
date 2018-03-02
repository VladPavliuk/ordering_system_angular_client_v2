import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  MatListModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
//<

//> Date picker
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
//<

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './components/partials/header/header.component';

//> Services
import { OrganizationsService } from './services/organizations/organizations.service';
import { ServicesService } from './services/services/services.service';
import { OrdersService } from './services/orders/orders.service';
import { UsersService } from './services/users/users.service';
//<

import { IndexComponent as OrganizationsIndexComponent } from './components/organizations/index/index.component'
import { AddComponent as OrganizationAddComponent } from './components/organizations/add/add.component'
import { SingleComponent as OrganizationSingleComponent } from './components/organizations/single/single.component'

import { IndexComponent as ServicesIndexComponent } from './components/services/index/index.component'
import { AddComponent as ServiceAddComponent } from './components/services/add/add.component'
import { SingleComponent as ServiceSingleComponent } from './components/services/single/single.component';
import { AvailableServicesComponent } from './components/organizations/available-services/available-services.component';

import { CreateComponent as CreateOrderComponent } from './components/order/create/create.component'
import { OrganizationsComponent as OrderOrganizationsComponent } from './components/order/create/organizations/organizations.component';
import { ServicesComponent as OrderServicesComponent } from './components/order/create/services/services.component';
import { IndexComponent  as OrdersIndexComponent } from './components/order/index/index.component'

import { IndexComponent as UsersIndexComponent } from './components/users/index/index.component'

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
    UsersIndexComponent
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
    CdkTableModule
  ],
  providers: [
    OrganizationsService,
    ServicesService,
    OrdersService,
    UsersService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
