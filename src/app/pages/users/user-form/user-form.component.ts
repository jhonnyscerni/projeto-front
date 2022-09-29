import {distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {RoleService} from 'src/app/services/role.service';
import {Role} from '../../../models/role';
import {UserService} from '../../../services/user.service';
import {User, UserPersonPhysical} from '../../../models/user';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertModalService} from 'src/app/@core/shared/services/alert-modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseFormComponent} from 'src/app/@core/shared/base-form/base-form.component';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {PersonPhysical} from '../../../models/person';
import {FormValidations} from '../../../@core/shared/form-validations';
import {NgBrazilValidators} from 'ng-brazil';
import {utilsBr} from 'js-brasil';
import {empty} from 'rxjs';
import {ConsultaCepService} from '../../../@core/shared/services/consulta-cep.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../@core/shared/utils/format-datepicker';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class UserFormComponent extends BaseFormComponent implements OnInit {

    user: UserPersonPhysical;
    userId: number;
    MASKS = utilsBr.MASKS;

    roles: Role[];

    constructor(
        private fb: FormBuilder,
        private alertService: AlertModalService,
        private location: Location,
        private route: ActivatedRoute,
        private usuarioService: UserService,
        private router: Router,
        private grupoService: RoleService,
        private toastr: ToastrService,
        private cepService: ConsultaCepService,
    ) {
        super();
    }

    ngOnInit() {

        this.route.params.subscribe((params: any) => {
            const idUsuario = params['userId'];
            if (idUsuario) {
                const usuario$ = this.usuarioService.findByIdPersonPhysical(idUsuario);
                usuario$.subscribe(usuario => {
                    this.updateForm(usuario);
                    this.roles = usuario.roles
                    this.carregarGrupos();
                });
            }
        });

        this.carregarGrupos();

        this.cadastroForm = this.fb.group({
            id: [''],
            username: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(250),
                ],
            ],
            password: ['', [Validators.required]],
            person: this.fb.group({
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
                }),
            }),
            roles: [''],
        });


        this.cadastroForm
            .get('person.address.zipCode')
            .statusChanges.pipe(
            distinctUntilChanged(),
            tap(value => console.log('status CEP:', value)),
            switchMap(status =>
                status === 'VALID'
                    ? this.cepService.consultaCEP(
                        this.cadastroForm.get('person.address.zipCode').value,
                    )
                    : empty(),
            ),
        )
            .subscribe(dados => (dados ? this.populaDadosForm(dados) : {}));
    }

    updateForm(user) {
        this.cadastroForm.patchValue({
            id: user.id,
            username: user.username,
            password: user.password,
            person: {
                id: user.person.id,
                name: user.person.name,
                cpf: user.person.cpf,
                email: user.person.email,
                phoneNumber: user.person.phoneNumber,
                birthDate: user.person.birthDate,
                gender: user.person.gender,
                sectionVote: user.person.sectionVote,
                zoneVoting: user.person.zoneVoting,
                surname: user.person.surname,
                vote: user.person.vote,
                address: {
                    zipCode: user.person?.address?.zipCode,
                    street: user.person?.address?.street,
                    number: user.person?.address?.number,
                    complement: user.person?.address?.complement,
                    district: user.person?.address?.district,
                    nameCity: user.person?.address?.nameCity,
                    state: user.person?.address?.state
                }
            },
            roles: user.roles
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
        let msgSuccess = 'Usuário criado com sucesso!';
        let msgError = 'Erro ao criar usuario, tente novamente!';
        if (this.cadastroForm.value.id) {
            msgSuccess = 'Usuário atualizado com sucesso!';
            msgError = 'Erro ao atualizar usuario, tente novamente!';
        }

        this.usuarioService.savePersonPhysical(this.cadastroForm.value).subscribe(
            success => {
                this.toastr.success(msgSuccess, 'Informação :)')
                this.location.back();
            },
            error => this.toastr.error(msgError, 'Opa :(')
        );
    }

    cancelar() {
        this.router.navigate(['/usuarios/pessoas/meus-cadastros'], {relativeTo: this.route});
    }

    carregarGrupos() {
        return this.grupoService.list()
            .subscribe(roles => {
                this.roles = roles
            });
    }

    compareFn(compared1: { id: number }, compared2: { id: number }) {
        return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
    }
}
