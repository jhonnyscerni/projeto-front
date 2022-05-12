import {AuthoritiesGuard} from './../../@core/shared/services/authorities.guard';
import {UserFormComponent} from './user-form/user-form.component';
import {Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {PersonFormComponent} from '../persons/person-form/person-form.component';
import {UserFormCompanyComponent} from './user-form-company/user-form-company.component';
import {UserListMyComponent} from './user-list-my/user-list-my.component';
import {UserListCompanyComponent} from './user-list-company/user-list-company.component';
import {UserListCompanyMyComponent} from './user-list-company-my/user-list-company-my.component';


export const userRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'pessoa/adicionar', component: UserFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CADASTRAR_USUARIOS']
            },
            {
                path: 'pessoa/editar/:userId', component: UserFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_EDITAR_USUARIOS']
            },
            {
                path: 'pessoa/:personId', component: PersonFormComponent,
            },
            {
                path: 'pessoas/todos', component: UserListComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_TODOS_USUARIOS']
            },
            {
                path: 'pessoas/meus-cadastros', component: UserListMyComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_MEUS_USUARIOS']
            },
            {
                path: 'empresa/adicionar', component: UserFormCompanyComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CADASTRAR_USUARIOS']
            },
            {
                path: 'empresa/editar/:userId', component: UserFormCompanyComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_EDITAR_USUARIOS']
            },
            {
                path: 'empresas/todos', component: UserListCompanyComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_TODOS_USUARIOS']
            },
            {
                path: 'empresas/meus-cadastros', component: UserListCompanyMyComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_MEUS_USUARIOS']
            }
        ]
    }
];
