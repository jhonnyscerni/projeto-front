import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../../@core/shared/base-form/base-form.component';
import {User} from '../../../models/user';
import {utilsBr} from 'js-brasil';
import {Role} from '../../../models/role';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {RoleService} from '../../../services/role.service';
import {ToastrService} from 'ngx-toastr';
import {ConsultaCepService} from '../../../@core/shared/services/consulta-cep.service';
import {PersonLegal} from '../../../models/person';
import {PersonPhysicalService} from '../../../services/person-physical.service';
import {PersonLegalService} from '../../../services/person-legal.service';

@Component({
    selector: 'app-company-user-form',
    templateUrl: './company-user-form.component.html',
    styleUrls: ['./company-user-form.component.scss']
})
export class CompanyUserFormComponent extends BaseFormComponent implements OnInit {

    user: User = new User();
    person: PersonLegal
    userId: number;
    empresaId: number;
    MASKS = utilsBr.MASKS;
    roles: Role[];

    constructor(private fb: FormBuilder,
                private alertService: AlertModalService,
                private location: Location,
                private route: ActivatedRoute,
                private personLegalService: PersonLegalService,
                private userService: UserService,
                private router: Router,
                private grupoService: RoleService,
                private toastr: ToastrService,
                private cepService: ConsultaCepService) {
        super();
    }

    ngOnInit() {
        this.carregarGrupos();
        this.route.params.subscribe((params: any) => {
            this.empresaId = params['empresaId'];
            if (this.empresaId) {
                const person$ = this.personLegalService.loadByID(this.empresaId);
                const user$ = this.userService.loadByPersonIDLegal(this.empresaId);
                person$.subscribe(person => {
                    this.person = person
                    this.updateForm(this.user);
                    this.carregarGrupos();
                    user$.subscribe(user => {
                        this.updateForm(user);
                    })
                });
            }
        });

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
            roles: [''],
            person: this.person
        });
    }

    updateForm(user:User) {
        this.cadastroForm.patchValue({
            id: user?.id,
            username: user?.username,
            password: user?.password,
            roles: user?.roles,
            person: this.person
        });
    }

    submit() {
        let msgSuccess = 'Usuário criado com sucesso!';
        let msgError = 'Erro ao criar usuario, tente novamente!';
        if (this.cadastroForm.value.id) {
            msgSuccess = 'Usuário atualizado com sucesso!';
            msgError = 'Erro ao atualizar usuario, tente novamente!';
        }
        console.log("id"+this.cadastroForm.value.id)
        if (this.cadastroForm.value.id) {
            this.userService.savePersonLegal(this.cadastroForm.value).subscribe(
                success => {
                    this.toastr.success(msgSuccess, 'Informação :)')
                    this.location.back();
                },
                error => this.toastr.error(msgError, 'Opa :(')
            );
        }else {
            console.log("personID"+this.empresaId)
            this.userService.savePersonUserLegal(this.cadastroForm.value, this.empresaId).subscribe(
                success => {
                    this.toastr.success(msgSuccess, 'Informação :)')
                    this.location.back();
                },
                error => this.toastr.error(msgError, 'Opa :(')
            );
        }
    }

    cancelar() {
        this.router.navigate(['/empresas/lista'], {relativeTo: this.route});
    }

    carregarGrupos() {
        return this.grupoService.list()
            .subscribe(roles => this.roles = roles);
    }

    compareFn(compared1: { id: number }, compared2: { id: number }) {
        return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
    }


}
