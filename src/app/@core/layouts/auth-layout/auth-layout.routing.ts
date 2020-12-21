import { Routes } from "@angular/router";

import { LoginComponent } from "../../../pages/portal/login/login.component";
import { PricingComponent } from "../../../pages/portal/pricing/pricing.component";
import { LockComponent } from "../../../pages/portal/lock/lock.component";
import { RegisterComponent } from "../../../pages/portal/register/register.component";
import { ContaGuard } from '../../shared/services/conta.guard';
import { RecuperarSenhaComponent } from 'src/app/pages/portal/recuperar-senha/recuperar-senha.component';

export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
        //verificar a implementação do ContGuard
        // component: LoginComponent, canActivate: [ContaGuard]
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "lock",
        component: LockComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "cadastrar",
        component: RegisterComponent
        //verificar a implementação do ContGuard
        //component: RegisterComponent,canActivate: [ContaGuard]
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "recuperar-senha",
        component: RecuperarSenhaComponent
        //verificar a implementação do ContGuard
        //component: RegisterComponent,canActivate: [ContaGuard]
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "pricing",
        component: PricingComponent
      }
    ]
  }
];
