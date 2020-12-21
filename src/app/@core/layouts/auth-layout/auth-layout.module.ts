import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";

import { LoginComponent } from "../../../pages/portal/login/login.component";
import { PricingComponent } from "../../../pages/portal/pricing/pricing.component";
import { LockComponent } from "../../../pages/portal/lock/lock.component";
import { RegisterComponent } from "../../../pages/portal/register/register.component";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProgressbarModule, BsDropdownModule, PaginationModule, TooltipModule } from 'ngx-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { NgxPrintModule } from 'ngx-print';
import { HttpClientModule } from '@angular/common/http';
import { ContaGuard } from '../../shared/services/conta.guard';
import { RecuperarSenhaComponent } from 'src/app/pages/portal/recuperar-senha/recuperar-senha.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    NgxPrintModule,
    SharedModule,
    HttpClientModule,
  ],
  declarations: [
    LoginComponent,
    PricingComponent,
    LockComponent,
    RegisterComponent,
    RecuperarSenhaComponent
  ],
  providers: [
    ContaGuard
  ]
})
export class AuthLayoutModule {}
