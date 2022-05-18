import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarRoutingModule} from './calendar-routing.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {CalendarComponent} from './calendar.component';
import {CalendarService} from './calendar.service';
import {TextMaskModule} from 'angular2-text-mask';
import {SharedModule} from '../../@core/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CalendarRoutingModule,
        FullCalendarModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        MatDialogModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatMenuModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        SharedModule,
        TextMaskModule

    ],
  declarations: [CalendarComponent],
  providers: [CalendarService],
})
export class CalendarsModule {}
