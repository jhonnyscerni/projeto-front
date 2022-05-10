import { RoleListComponent } from './role-list/role-list.component';
import { AuthoritiesGuard } from './../../@core/shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';


export const grupoRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: GrupoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CADASTRAR_GRUPOS']
      },
      {
        path: "editar/:roleId", component: GrupoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_GRUPOS']
      },
      {
        path: "detalhe/:roleId", component: GrupoFormComponent
      },
      {
        path: "lista", component: RoleListComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_GRUPOS']
      },
      { path: "", redirectTo: '/grupos/lista', pathMatch: 'full' }
    ]
  }
];
