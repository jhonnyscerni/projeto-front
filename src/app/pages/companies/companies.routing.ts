import {Routes} from '@angular/router';
import {CompanyListComponent} from './company-list/company-list.component';
import {UserFormComponent} from '../users/user-form/user-form.component';
import {AuthoritiesGuard} from '../../@core/shared/services/authorities.guard';
import {CompanyFormComponent} from './company-form/company-form.component';
import {PersonUserFormComponent} from '../persons/person-user-form/person-user-form.component';
import {CompanyUserFormComponent} from './company-user-form/company-user-form.component';
import {CompanyListMyComponent} from './company-list-my/company-list-my.component';


export const companiesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: ':empresaId/usuarios', component: CompanyUserFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CADASTRAR_USUARIOS']
            },
            {
                path: 'adicionar', component: CompanyFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CADASTRAR_EMPRESAS']
            },
            {
                path: 'editar/:empresaId', component: CompanyFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_EDITAR_EMPRESAS']
            },
            {
                path: 'todas', component: CompanyListComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_TODAS_EMPRESAS']
            },
            {
                path: 'meus-cadastros', component: CompanyListMyComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_MINHAS_EMPRESAS']
            }
        ]
    }
];
