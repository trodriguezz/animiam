import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SelectMenuComponent } from './components/select-menu/select-menu.component';
import { TableSelectComponent } from './components/table-select/table-select.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertComponent } from './components/alert/alert.component';
import { SecurityInterceptorService } from './services/security-interceptor/security-interceptor.service';
import { AlimentComponent } from './components/aliment/aliment.component';


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
    AlimentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
