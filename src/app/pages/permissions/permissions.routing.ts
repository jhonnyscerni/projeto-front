import { AuthoritiesGuard } from './../../@core/shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { PermissionListComponent } from './permission-list/permission-list.component';


export const permissaoRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: PermissionFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_PERMISSOES']
      },
      {
        path: "editar/:permissionId", component: PermissionFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_PERMISSOES']
      },
      {
        path: "detalhe/:permissionId", component: PermissionFormComponent
      },
      //Falta implementar verificar uma forma de validar isso, pois so ta no back-end a validação
      // {
      //   path: "excluir/:idUsuario", component: UserListComponent,
      //   canActivate: [AuthoritiesGuard],
      //   data: ['SEG_REMOVER_USUARIOS']
      // },
      {
        path: "lista", component: PermissionListComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PERMISSOES']
      },
      { path: "", redirectTo: '/permissoes/lista', pathMatch: 'full' }
    ]
  }
];
