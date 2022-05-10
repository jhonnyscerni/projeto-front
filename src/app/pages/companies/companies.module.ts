import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompanyListComponent} from './company-list/company-list.component';
import {ComponentsModule} from '../../@core/components/components.module';
import {BsDropdownModule, ProgressbarModule, TooltipModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../@core/shared/shared.module';
import {companiesRoutes} from './companies.routing';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyUserFormComponent } from './company-user-form/company-user-form.component';
import { CompanyListMyComponent } from './company-list-my/company-list-my.component';


@NgModule({
  declarations: [CompanyListComponent, CompanyFormComponent, CompanyUserFormComponent, CompanyListMyComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(companiesRoutes),
    NgxPaginationModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class CompaniesModule { }
