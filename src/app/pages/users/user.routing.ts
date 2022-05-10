import { AuthoritiesGuard } from './../../@core/shared/services/authorities.guard';
import { UserFormComponent } from './user-form/user-form.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import {UserFormEditComponent} from './user-form-edit/user-form-edit.component';
import {PersonFormComponent} from '../persons/person-form/person-form.component';
import {UserFormCompanyComponent} from './user-form-company/user-form-company.component';


export const userRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: "pessoa/adicionar", component: UserFormComponent,
         canActivate: [AuthoritiesGuard],
         data: ['SEG_CADASTRAR_USUARIOS']
      },
      {
        path: "empresa/adicionar", component: UserFormCompanyComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_USUARIOS']
      },
      {
        path: "editar/:userId", component: UserFormEditComponent,
         canActivate: [AuthoritiesGuard],
         data: ['SEG_EDITAR_USUARIOS']
      },
      {
        path: "pessoa/:personId", component: PersonFormComponent,
      },
      {
        path: "detalhe/:userId", component: UserFormComponent
      },
      {
        path: "lista", component: UserListComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_USUARIOS']
      },
      { path: "", redirectTo: '/usuarios/lista', pathMatch: 'full' }
    ]
  }
];
