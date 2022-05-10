import {Routes} from '@angular/router';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonFormComponent} from './person-form/person-form.component';
import {PersonUserFormComponent} from './person-user-form/person-user-form.component';
import {PersonListMyComponent} from './person-list-my/person-list-my.component';
import {AuthoritiesGuard} from '../../@core/shared/services/authorities.guard';


export const personRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: ':personId/usuarios', component: PersonUserFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CADASTRAR_USUARIOS']
            },
            {
                path: 'adicionar', component: PersonFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CADASTRAR_PESSOAS']
            },
            {
                path: 'editar/:personId', component: PersonFormComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_EDITAR_PESSOAS']
            },
            {
                path: 'todas', component: PersonListComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_TODOS_PESSOAS']
            },
            {
                path: 'meus-cadastros', component: PersonListMyComponent,
                canActivate: [AuthoritiesGuard],
                data: ['SEG_CONSULTAR_MINHAS_PESSOAS']
            },
        ]
    }
];
