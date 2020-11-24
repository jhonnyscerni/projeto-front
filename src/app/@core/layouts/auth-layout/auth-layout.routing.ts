import { Routes } from "@angular/router";

import { LoginComponent } from "../../../pages/portal/login/login.component";
import { PricingComponent } from "../../../pages/portal/pricing/pricing.component";
import { LockComponent } from "../../../pages/portal/lock/lock.component";
import { RegisterComponent } from "../../../pages/portal/register/register.component";
import { PresentationComponent } from "../../../pages/presentation/presentation.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
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
        path: "register",
        component: RegisterComponent
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
