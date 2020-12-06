import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./@core/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./@core/layouts/auth-layout/auth-layout.component";
import { PresentationComponent } from "./pages/presentation/presentation.component";
import { AcessoNegadoComponent } from './@core/components/acesso-negado/acesso-negado.component';
import { NotFoundComponent } from './@core/components/not-found/not-found.component';
import { AuthGuard } from './@core/shared/services/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: PresentationComponent
  },
  {
    path: "",
    component: AdminLayoutComponent, 
    canActivate : [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: "./pages/dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "components",
        loadChildren: "./pages/components/components.module#ComponentsModule"
      },
      {
        path: "forms",
        loadChildren: "./pages/forms/forms.module#FormsModules"
      },
      {
        path: "tables",
        loadChildren: "./pages/tables/tables.module#TablesModule"
      },
      {
        path: "widgets",
        loadChildren: "./pages/widgets/widgets.module#WidgetsModule"
      },
      {
        path: "charts",
        loadChildren: "./pages/charts/charts.module#ChartsModule"
      },
      {
        path: "portal",
        loadChildren: "./pages/portal/portal.module#PortalModule"
      },
      {
        path: "usuarios",
        loadChildren: "./pages/usuarios/usuarios.module#UsuariosModule"
      },
      { path: 'painel/acesso-negado', component: AcessoNegadoComponent }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "portal",
        loadChildren:
          "./@core/layouts/auth-layout/auth-layout.module#AuthLayoutModule"
      }
    ]
  },
  // {
  //   path: "**",
  //   redirectTo: "dashboard"
  // },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
