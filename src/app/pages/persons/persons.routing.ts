import {Routes} from '@angular/router';
import {PersonListComponent} from './person-list/person-list.component';
import {PersonFormComponent} from './person-form/person-form.component';


export const personRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adicionar", component: PersonFormComponent,
      },
      {
        path: "editar/:personId", component: PersonFormComponent,
      },
      {
        path: "lista", component: PersonListComponent,
      },
      { path: "", redirectTo: '/pessoas/lista', pathMatch: 'full' }
    ]
  }
];
