import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";

import { LoginComponent } from "../../pages/portal/login/login.component";
import { PricingComponent } from "../../pages/portal/pricing/pricing.component";
import { LockComponent } from "../../pages/portal/lock/lock.component";
import { RegisterComponent } from "../../pages/portal/register/register.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
    PricingComponent,
    LockComponent,
    RegisterComponent
  ]
})
export class AuthLayoutModule {}
