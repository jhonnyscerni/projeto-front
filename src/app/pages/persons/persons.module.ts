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
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonUserFormComponent } from './person-user-form/person-user-form.component';


@NgModule({
  declarations: [PersonListComponent, PersonFormComponent, PersonUserFormComponent],
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
