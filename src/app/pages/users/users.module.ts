import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserListComponent} from './user-list/user-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {RouterModule} from '@angular/router';
import {BsDropdownModule, ProgressbarModule, TooltipModule} from 'ngx-bootstrap';
import {userRoutes} from './user.routing';
import {UserFormComponent} from './user-form/user-form.component';
import {ComponentsModule} from 'src/app/@core/components/components.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from 'src/app/@core/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgBrazil} from 'ng-brazil';
import {TextMaskModule} from 'angular2-text-mask';
import {UserFormCompanyComponent} from './user-form-company/user-form-company.component';
import { UserListMyComponent } from './user-list-my/user-list-my.component';
import { UserListCompanyComponent } from './user-list-company/user-list-company.component';
import { UserListCompanyMyComponent } from './user-list-company-my/user-list-company-my.component';
import {ComponentDatepickerModule} from '../../@core/components/component-datepicker/component-datepicker.module';


@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        RouterModule.forChild(userRoutes),
        NgxPaginationModule,

        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,

        // Validation
        TextMaskModule,
        NgBrazil,

        ComponentDatepickerModule
    ],
    declarations: [UsersComponent, UserListComponent, UserFormComponent, UserFormCompanyComponent, UserListMyComponent, UserListCompanyComponent, UserListCompanyMyComponent],
    exports: [UsersComponent, UserListComponent, UserFormComponent]
})
export class UsersModule {
}

