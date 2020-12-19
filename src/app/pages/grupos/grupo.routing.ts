import { GrupoListaComponent } from './grupo-lista/grupo-lista.component';
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
        path: "editar/:idGrupo", component: GrupoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_EDITAR_GRUPOS']
      },
      {
        path: "detalhe/:idGrupo", component: GrupoFormComponent
      },
      //Falta implementar verificar uma forma de validar isso, pois so ta no back-end a validação
      // {
      //   path: "excluir/:idUsuario", component: UsuarioListaComponent,
      //   canActivate: [AuthoritiesGuard],
      //   data: ['SEG_REMOVER_USUARIOS']
      // },
      {
        path: "lista", component: GrupoListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['SEG_CONSULTAR_GRUPOS']
      },
      { path: "", redirectTo: '/grupos/lista', pathMatch: 'full' }
    ]
  }
];
