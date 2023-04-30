import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {CalendarService} from '../../calendar.service';
import {
    FormControl,
    Validators,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import {Calendar} from '../../calendar.model';
import {formatDate} from '@angular/common';
import {utilsBr} from 'js-brasil';
import {Appointment} from '../../../../models/appointment';
import {BaseFormComponent} from '../../../../@core/shared/base-form/base-form.component';
import {AuthService} from '../../../../@core/shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AlertModalService} from '../../../../@core/shared/services/alert-modal.service';
import {AppointmentService} from '../../../../services/appointment.service';
import {Person} from '../../../../models/person';
import {User} from '../../../../models/user';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent extends BaseFormComponent {

    MASKS = utilsBr.MASKS;

    action: string;
    dialogTitle: string;
    calendarForm: FormGroup;
    calendar: Appointment;
    showDeleteBtn = false;

    cadastroFormLancamento: FormGroup;
    user = User
    className: any

    constructor(
        public dialogRef: MatDialogRef<FormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public calendarService: CalendarService,
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private appointmentService: AppointmentService,
        private toastr: ToastrService,
        private alertService: AlertModalService,
    ) {
        super();
        this.user = this.authService.getUserId();
        this.action = data.action;
        if (this.action === 'edit') {
            this.dialogTitle = data.calendar.title;
            this.calendar = data.calendar;
            this.showDeleteBtn = true;
            const idAppointment = data.calendar.id;

            if (idAppointment) {
                const load$ = this.appointmentService.loadByID(idAppointment);
                load$.subscribe(p => {
                    console.log(p);
                    this.updateForm(p);
                });
            }


        } else {
            this.dialogTitle = 'Novo Compromisso';
            this.showDeleteBtn = false;
        }

        this.cadastroForm = this.fb.group({
            id: [''],
            title: [''],
            dateAppointment: [''],
            locationService: [''],
            comments: [''],
            className: [this.className],
            userId: [this.user]
        });

    }

    submit() {
        // emppty stuff
        let msgSuccess = 'Consulta criada com sucesso!';
        let msgError = 'Erro ao criar consulta, tente novamente!';
        if (this.cadastroForm.value.id) {
            msgSuccess = 'Profissional atualizado com sucesso!';
            msgError = 'Erro ao atualizar profissional, tente novamente!';
        }

        this.appointmentService.save(this.cadastroForm.value).subscribe(
            success => {
                this.toastr.success(msgSuccess, 'Informação :)')
                this.dialogRef.close('submit');
            },
            error =>
                this.toastr.error(msgError, 'Opa :(')
        );
    }


    updateForm(appointment) {

        this.cadastroForm.patchValue({
            id: appointment.id,
            title: appointment.title,
            dateAppointment: appointment.dateAppointment,
            locationService: appointment.locationService,
            comments: appointment.comments,
            userId: this.user
        });
    }

    atualizarClassName(consulta) {
        this.cadastroForm.patchValue({
            className: this.getClassNameValue(consulta)
        });
    }

    getClassNameValue(status) {
        if (status === 'CONFIRMADO')
            this.className = 'fc-event-warning'
        else if (status == 'AGENDADO')
            this.className = 'fc-event-primary'
        else if (status == 'CANCELADO')
            this.className = 'fc-event-danger'
        else if (status == 'REAGENDADO')
            this.className = 'fc-event-info'
        else if (status == 'FINALIZADO')
            this.className = 'fc-event-success'


        return this.className;
    }
}
