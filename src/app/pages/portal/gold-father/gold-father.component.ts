import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';

import {map, tap, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {empty} from 'rxjs';

import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {BaseFormComponent} from 'src/app/@core/shared/base-form/base-form.component';
import {AlertModalService} from 'src/app/@core/shared/services/alert-modal.service';
import {DropdownService} from 'src/app/@core/shared/services/dropdown.service';
import {ConsultaCepService} from 'src/app/@core/shared/services/consulta-cep.service';
import {VerificaEmailService} from 'src/app/@core/shared/services/verifica-email.service';
import {FormValidations} from 'src/app/@core/shared/form-validations';
import {PersonPhysical} from '../../../models/person';

@Component({
    selector: 'app-gold-father',
    templateUrl: './gold-father.component.html',
    styleUrls: ['./gold-father.component.scss']
})
export class GoldFatherComponent extends BaseFormComponent implements OnInit {

    personPhysical: PersonPhysical;

    constructor(private fb: FormBuilder,
                private alertService: AlertModalService,
                private route: ActivatedRoute,
                private dropdownService: DropdownService,
                private cepService: ConsultaCepService,
                private verificaEmailService: VerificaEmailService) {
        super();
    }

    ngOnInit() {

        this.cadastroForm = this.fb.group({
            id: [''],
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(250),
                ],
            ],
            email: [
                '',
                [Validators.required, Validators.email],
                [this.validarEmail.bind(this)],
            ],
            phoneNumber: [''],
            address: this.fb.group({
                zipCode: ['', [Validators.required, FormValidations.cepValidator]],
                street: ['', Validators.required],
                number: ['', Validators.required],
                complement: [''],
                district: ['', Validators.required],
                nameCity: ['', Validators.required],
                state: ['', Validators.required]
            }),
        });
        this.cadastroForm
            .get('address.zipCode')
            .statusChanges.pipe(
            distinctUntilChanged(),
            tap(value => console.log('status CEP:', value)),
            switchMap(status =>
                status === 'VALID'
                    ? this.cepService.consultaCEP(
                        this.cadastroForm.get('address.zipCode').value,
                    )
                    : empty(),
            ),
        )
            .subscribe(dados => (dados ? this.populaDadosForm(dados) : {}));
    }

    submit() {
        console.log('submit');

        let msgSuccess = 'Curso criado com sucesso!';
        let msgError = 'Erro ao criar curso, tente novamente!';
        if (this.cadastroForm.value.id) {
            console.log(this.cadastroForm.value);
            msgSuccess = 'Curso atualizado com sucesso!';
            msgError = 'Erro ao atualizar curso, tente novamente!';
        }

    }

    populaDadosForm(dados) {
        console.log(dados);
        this.cadastroForm.patchValue({
            address: {
                street: dados.logradouro,
                district: dados.bairro,
                nameCity: dados.localidade,
                state: dados.uf,
                complement: dados.complemento
            },
        });
    }

    validarEmail(formControl: FormControl) {
        return this.verificaEmailService
            .verificarEmail(formControl.value)
            .pipe(map(emailExiste => (emailExiste ? {emailInvalido: true} : null)));
    }

}
