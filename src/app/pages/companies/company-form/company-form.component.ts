import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {PersonLegal} from '../../../models/person';
import {FormBuilder, Validators} from '@angular/forms';
import {NgBrazilValidators} from 'ng-brazil';
import {FormValidations} from '../../../@core/shared/form-validations';
import {BaseFormComponent} from '../../../@core/shared/base-form/base-form.component';
import {utilsBr} from 'js-brasil';
import {distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {empty} from 'rxjs';
import {ConsultaCepService} from '../../../@core/shared/services/consulta-cep.service';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {RoleService} from '../../../services/role.service';
import {ToastrService} from 'ngx-toastr';
import {PersonLegalService} from '../../../services/person-legal.service';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent extends BaseFormComponent implements OnInit {


    person: PersonLegal;
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
        private empresaService: PersonLegalService
    ) {
        super();
    }

    ngOnInit() {

        this.route.params.subscribe((params: any) => {
            const idEmpresa = params['empresaId'];
            if (idEmpresa) {
                const empresa$ = this.empresaService.loadByID(idEmpresa);
                empresa$.subscribe(empresa => {
                    this.updateForm(empresa);
                });
            }
        });


        this.cadastroForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            email: [
                '',
                [Validators.required, Validators.email],
            ],
            phoneNumber: [''],
            vote: [''],
            cnpj: ['', [Validators.required, NgBrazilValidators.cnpj]],
            address: this.fb.group({
                zipCode: ['', [FormValidations.cepValidator]],
                street: [''],
                number: [''],
                complement: [''],
                district: [''],
                nameCity: [''],
                state: ['']
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

    updateForm(empresa) {
        this.cadastroForm.patchValue({
            id: empresa.id,
            name: empresa.name,
            email: empresa.email,
            phoneNumber: empresa.phoneNumber,
            vote: empresa.vote,
            cnpj: empresa.cnpj,
            address: {
                zipCode: empresa?.address?.zipCode,
                street: empresa?.address?.street,
                number: empresa?.address?.number,
                complement: empresa?.address?.complement,
                district: empresa?.address?.district,
                nameCity: empresa?.address?.nameCity,
                state: empresa?.address?.state
            }
        });
    }

    submit() {
        let msgSuccess = 'Usuário criado com sucesso!';
        let msgError = 'Erro ao criar usuario, tente novamente!';
        if (this.cadastroForm.value.id) {
            msgSuccess = 'Usuário atualizado com sucesso!';
            msgError = 'Erro ao atualizar usuario, tente novamente!';
        }

        this.empresaService.save(this.cadastroForm.value).subscribe(
            success => {
                this.toastr.success(msgSuccess, 'Informação :)')
                this.location.back();
            },
            error => this.toastr.error(msgError, 'Opa :(')
        );
    }

    cancelar() {
        this.router.navigate(['/empresas/lista'], {relativeTo: this.route});
    }


}