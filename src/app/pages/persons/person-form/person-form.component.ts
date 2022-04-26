import {Component, OnInit} from '@angular/core';
import {PersonPhysical} from '../../../models/person';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ConsultaCepService} from '../../../@core/shared/services/consulta-cep.service';
import {PersonPhysicalService} from '../../../services/person-physical.service';
import {NgBrazilValidators} from 'ng-brazil';
import {FormValidations} from '../../../@core/shared/form-validations';
import {BaseFormComponent} from '../../../@core/shared/base-form/base-form.component';
import {utilsBr} from 'js-brasil';
import {distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {empty} from 'rxjs';

@Component({
    selector: 'app-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent extends BaseFormComponent implements OnInit {


    person: PersonPhysical;
    userId: number;
    MASKS = utilsBr.MASKS;

    constructor(
        private fb: FormBuilder,
        private alertService: AlertModalService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private cepService: ConsultaCepService,
        private personPhysicalService: PersonPhysicalService
    ) {
        super();
    }

    ngOnInit() {

        this.route.params.subscribe((params: any) => {
            const personId = params['personId'];
            if (personId) {
                const person$ = this.personPhysicalService.loadByID(personId);
                person$.subscribe(person => {
                    this.updateForm(person);
                });
            }
        });

        this.cadastroForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
            email: [
                '',
                [Validators.required, Validators.email],
            ],
            phoneNumber: [''],
            birthDate: [''],
            gender: [''],
            sectionVote: [''],
            zoneVoting: [''],
            surname: [''],
            vote: [''],
            address: this.fb.group({
                zipCode: ['', [Validators.required, FormValidations.cepValidator]],
                street: ['', Validators.required],
                number: ['', Validators.required],
                complement: [''],
                district: ['', Validators.required],
                nameCity: ['', Validators.required],
                state: ['', Validators.required]
            })
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

    updateForm(person) {
        this.cadastroForm.patchValue({

            id: person.id,
            name: person.name,
            cpf: person.cpf,
            email: person.email,
            phoneNumber: person.phoneNumber,
            birthDate: person.birthDate,
            gender: person.gender,
            sectionVote: person.sectionVote,
            zoneVoting: person.zoneVoting,
            surname: person.surname,
            vote: person.vote,
            address: {
                zipCode: person?.address?.zipCode,
                street: person?.address?.street,
                number: person?.address?.number,
                complement: person?.address?.complement,
                district: person?.address?.district,
                nameCity: person?.address?.nameCity,
                state: person?.address?.state
            }
        });
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

    submit() {
        let msgSuccess = 'Criado com sucesso!';
        let msgError = 'Erro ao criar, tente novamente!';
        if (this.cadastroForm.value.id) {
            msgSuccess = 'Atualizado com sucesso!';
            msgError = 'Erro ao atualizar, tente novamente!';
        }

        this.personPhysicalService.save(this.cadastroForm.value).subscribe(
            success => {
                this.toastr.success(msgSuccess, 'Informação :)')
                this.location.back();
            },
            error => this.toastr.error(msgError, 'Opa :(')
        );
    }

    cancelar(){
        this.router.navigate(['/pessoas/lista'], { relativeTo: this.route });
    }



}
