import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {CalendarService} from './calendar.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import esLocale from '@fullcalendar/core/locales/es';
import ptLocale from '@fullcalendar/core/locales/pt';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseFormComponent} from '../../@core/shared/base-form/base-form.component';
import {AuthService} from '../../@core/shared/services/auth.service';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../models/appointment';

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseFormComponent implements OnInit {
    @ViewChild('calendar', { static: false })

    calendar: Appointment | null;
    dialogTitle: string;
    calendarData: any;
    locales = [esLocale, ptLocale];


    calendarVisible = true;
    calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
    calendarWeekends = true;
    @ViewChild('callAPIDialog', { static: false }) callAPIDialog: TemplateRef<any>;
    calendarEvents



    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        public calendarService: CalendarService,
        private snackBar: MatSnackBar,

        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService,
        private appointmentService: AppointmentService,
    ) {
        super();
        this.dialogTitle = 'Adicionar Novo Compromisso';
        this.calendar = new Appointment();

    }

    profissional = this.authService.getUsuarioIdAutenticado();

    public ngOnInit(): void {

        this.listar();
        // criar FORM
        this.cadastroForm = this.fb.group({
            id: [''],
            paciente: this.fb.group({
                id: ['', Validators.required]
            }),
            profissional: this.fb.group({
                id: [this.profissional]
            }),
            dataHora: [],
            localDeAtendimento: ['', [Validators.required]],
            procedimentoEnum: ['', [Validators.required]],
            statusConsultaEnum: [''],
            convenioEnum: ['', [Validators.required]],
            observacoes: ['', [Validators.required]],
        });
    }

    listar(){

        this.appointmentService.listResults()
            .subscribe(
                appointment => {
                    this.calendarEvents = appointment

                }
            );
    }

    addNewEvent() {

        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '60%',
            data: {
                calendar: this.calendar,
                action: 'add',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {

            if (result === "submit") {
                this.calendarData = this.calendarService.getDialogData();
                // console.log(this.calendarData)

                // this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
                //   id: this.calendarData.id,
                //   title: this.calendarData.title,
                //   start: this.calendarData.startDate,
                //   end: this.calendarData.endDate,
                //   className: this.calendarData.category,
                //   groupId: this.calendarData.category,
                //   details: this.calendarData.details,
                // })
                this.listar()
                this.cadastroForm.reset();
            }
        });
    }
    eventClick(appointment) {
        const calendarData: any = {
            id: appointment.event.id
        };


        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '60%',
            data: {
                calendar: calendarData,
                action: 'edit',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === "submit") {
                // this.calendarData = this.calendarService.getDialogData();
                // this.calendarEvents.forEach(function (element, index) {
                //   if (this.calendarData.id === element.id) {
                //     this.editEvent(index, this.calendarData);
                //   }
                // }, this);
                this.listar();
                // this.showNotification(
                //   'black',
                //   'Edição efetuada com Sucesso...!!!',
                //   'bottom',
                //   'center'
                // );
                this.cadastroForm.reset();
            } else if (result === "delete") {
                // this.calendarData = this.calendarService.getDialogData();
                // this.calendarEvents.forEach(function (element, index) {
                //   if (this.calendarData.id === element.id) {
                //     this.filterEvent(element);
                //   }
                // }, this);
                this.listar()
                // this.showNotification(
                //   'snackbar-danger',
                //   'Consulta Excluida com Sucesso...!!!',
                //   'bottom',
                //   'center'
                // );
            }
        });
    }


    editEvent(eventIndex, calendarData) {
        const calendarEvents = this.calendarEvents.slice();
        const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
        singleEvent.id = calendarData.id;

        // singleEvent.title = calendarData.title;
        // singleEvent.start = calendarData.startDate;
        // // singleEvent.end = calendarData.endDate;
        //  singleEvent.className = this.getClassNameValue("AGENDADO");
        // // singleEvent.groupId = calendarData.category;
        // singleEvent.details = calendarData.details;
        calendarEvents[eventIndex] = singleEvent;
        this.calendarEvents = calendarEvents; // reassign the array
    }
    handleEventRender(info) {
        // console.log(info)
        // this.todaysEvents = this.todaysEvents.concat(info);
    }

    submit() {
        // emppty stuff
    }
    onNoClick(): void {
    }
    showNotification(colorName, text, placementFrom, placementAlign) {
        this.snackBar.open(text, '', {
            duration: 2000,
            verticalPosition: placementFrom,
            horizontalPosition: placementAlign,
            panelClass: colorName,
        });
    }

}

