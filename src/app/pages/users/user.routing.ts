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
      },
      {
        path: "empresa/adicionar", component: UserFormCompanyComponent,
      },
      {
        path: "editar/:userId", component: UserFormEditComponent,
      },
      {
        path: "pessoa/:personId", component: PersonFormComponent,
      },
      {
        path: "detalhe/:userId", component: UserFormComponent
      },
      {
        path: "todos", component: UserListComponent,
      },
      {
        path: "meus-cadastros", component: UserListComponent,
      }
    ]
  }
];
