import {Routes} from '@angular/router';
import {PersonListComponent} from './person-list/person-list.component';


export const personRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "lista", component: PersonListComponent,
      },
      { path: "", redirectTo: '/pessoas/lista', pathMatch: 'full' }
    ]
  }
];
