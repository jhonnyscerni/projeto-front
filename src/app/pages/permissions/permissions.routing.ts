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
      {
        path: "lista", component: PermissionListComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_PERMISSOES']
      },
      { path: "", redirectTo: '/permissoes/lista', pathMatch: 'full' }
    ]
  }
];
