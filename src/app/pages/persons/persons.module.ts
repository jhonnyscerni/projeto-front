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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ComponentDatepickerModule} from '../../@core/components/component-datepicker/component-datepicker.module';


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
        SharedModule,

        // MAT
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        MatSortModule,
        MatDatepickerModule,
        MatTabsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ComponentDatepickerModule
    ],
    exports:[
        PersonListComponent, PersonFormComponent, PersonUserFormComponent
    ]
})
export class PersonsModule { }
