import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonListComponent} from './person-list/person-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ComponentsModule} from '../../@core/components/components.module';
import {BsDropdownModule, ProgressbarModule, TooltipModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../@core/shared/shared.module';
import {personRoutes} from './persons.routing';


@NgModule({
  declarations: [PersonListComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        RouterModule.forChild(personRoutes),
        NgxPaginationModule,

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule
    ]
})
export class PersonsModule { }
