import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';
import { TableSelectComponent } from './table-select/table-select.component';


const routes: Routes = [  // Routes (tableau de route) = type (classe) de routes (var)
  { path: '', component: StartMenuComponent },
  { path: 'login', component: LoginUserComponent},
  { path: 'contact', component: ContactAdminComponent},
  { path: 'create', component: CreateUserComponent},
  { path: 'select', component: SelectMenuComponent},
  { path: 'table', component: TableSelectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } // Nom de type
