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
import {UserFormEditComponent} from './user-form-edit/user-form-edit.component';
import {UserFormCompanyComponent} from './user-form-company/user-form-company.component';
import { UserListMyComponent } from './user-list-my/user-list-my.component';


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
    ],
    declarations: [UsersComponent, UserListComponent, UserFormComponent, UserFormEditComponent, UserFormCompanyComponent, UserListMyComponent],
    exports: [UsersComponent, UserListComponent, UserFormComponent, UserFormEditComponent]
})
export class UsersModule {
}

