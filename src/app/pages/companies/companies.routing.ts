import {Routes} from '@angular/router';
import {CompanyListComponent} from './company-list/company-list.component';
import {UserFormComponent} from '../users/user-form/user-form.component';
import {AuthoritiesGuard} from '../../@core/shared/services/authorities.guard';
import {CompanyFormComponent} from './company-form/company-form.component';
import {PersonUserFormComponent} from '../persons/person-user-form/person-user-form.component';
import {CompanyUserFormComponent} from './company-user-form/company-user-form.component';


export const companiesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: ":empresaId/usuarios", component: CompanyUserFormComponent,
      },
      {
        path: "adicionar", component: CompanyFormComponent,
      },
      {
        path: "editar/:empresaId", component: CompanyFormComponent,
      },
      {
        path: "lista", component: CompanyListComponent,
      },
      { path: "", redirectTo: '/empresas/lista', pathMatch: 'full' }
    ]
  }
];
