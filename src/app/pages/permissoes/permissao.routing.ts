import { AuthoritiesGuard } from './../../@core/shared/services/authorities.guard';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PermissaoFormComponent } from './permissao-form/permissao-form.component';
import { PermissaoListaComponent } from './permissao-lista/permissao-lista.component';


export const permissaoRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: PermissaoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['CADASTRAR_PERMISSOES']
      },
      {
        path: "editar/:idPermissao", component: PermissaoFormComponent,
        canActivate: [AuthoritiesGuard],
        data: ['EDITAR_PERMISSOES']
      },
      {
        path: "detalhe/:idPermissao", component: PermissaoFormComponent
      },
      //Falta implementar verificar uma forma de validar isso, pois so ta no back-end a validação
      // {
      //   path: "excluir/:idUsuario", component: UsuarioListaComponent,
      //   canActivate: [AuthoritiesGuard],
      //   data: ['REMOVER_USUARIOS']
      // },
      {
        path: "lista", component: PermissaoListaComponent,
        canActivate: [AuthoritiesGuard],
        data: ['CONSULTAR_PERMISSOES']
      },
      { path: "", redirectTo: '/permissoes/lista', pathMatch: 'full' }
    ]
  }
];
