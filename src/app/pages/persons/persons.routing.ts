import {Routes} from '@angular/router';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonFormComponent} from './person-form/person-form.component';
import {PersonUserFormComponent} from './person-user-form/person-user-form.component';
import {PersonListMyComponent} from './person-list-my/person-list-my.component';


export const personRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: ":personId/usuarios", component: PersonUserFormComponent,
      },
      {
        path: "adicionar", component: PersonFormComponent,
      },
      {
        path: "editar/:personId", component: PersonFormComponent,
      },
      {
        path: "todas", component: PersonListComponent,
      },
      {
        path: "meus-cadastros", component: PersonListMyComponent,
      },
    ]
  }
];
