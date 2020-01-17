import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';
import { TableSelectComponent } from './table-select/table-select.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    StartMenuComponent,
    LoginUserComponent,
    ContactAdminComponent,
    CreateUserComponent,
    SelectMenuComponent,
    TableSelectComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
