import { AuthoritiesGuard } from './../../@core/shared/services/authorities.guard';
import { UserFormComponent } from './user-form/user-form.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import {UserFormEditComponent} from './user-form-edit/user-form-edit.component';


export const userRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: "adicionar", component: UserFormComponent,
         canActivate: [AuthoritiesGuard],
         data: ['SEG_CADASTRAR_USUARIOS']
      },
      {
        path: "editar/:userId", component: UserFormEditComponent,
         canActivate: [AuthoritiesGuard],
         data: ['SEG_EDITAR_USUARIOS']
      },
      {
        path: "detalhe/:userId", component: UserFormComponent
      },
      //Falta implementar verificar uma forma de validar isso, pois so ta no back-end a validação
      // {
      //   path: "excluir/:idUsuario", component: UserListComponent,
      //   canActivate: [AuthoritiesGuard],
      //   data: ['SEG_REMOVER_USUARIOS']
      // },
      {
        path: "lista", component: UserListComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_USUARIOS']
      },
      { path: "", redirectTo: '/usuarios/lista', pathMatch: 'full' }
    ]
  }
];
