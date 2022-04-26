import {Routes} from '@angular/router';
import {CompanyListComponent} from './company-list/company-list.component';


export const companiesRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "lista", component: CompanyListComponent,
      },
      { path: "", redirectTo: '/empresas/lista', pathMatch: 'full' }
    ]
  }
];
