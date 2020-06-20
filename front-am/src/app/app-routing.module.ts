import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SelectMenuComponent } from './components/select-menu/select-menu.component';
import { TableSelectComponent } from './components/table-select/table-select.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [  // Routes = tableau de routes (liens ng)
  { path: '', component: StartMenuComponent },
  { path: 'login', component: LoginUserComponent},
  { path: 'contact', component: ContactAdminComponent},
  { path: 'create', component: CreateUserComponent},
  { path: 'select', component: SelectMenuComponent},
  { path: 'table', component: TableSelectComponent},
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } // Nom de type
