import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {RoleService} from '../../../services/role.service';
import {ToastrService} from 'ngx-toastr';
import {ConsultaCepService} from '../../../@core/shared/services/consulta-cep.service';
import {User} from '../../../models/user';
import {BaseFormComponent} from '../../../@core/shared/base-form/base-form.component';
import {Role} from '../../../models/role';
import {NgBrazilValidators} from 'ng-brazil';
import {FormValidations} from '../../../@core/shared/form-validations';

@Component({
  selector: 'app-user-form-edit',
  templateUrl: './user-form-edit.component.html',
  styleUrls: ['./user-form-edit.component.scss']
})
export class UserFormEditComponent extends BaseFormComponent implements OnInit  {

  user: User;
  userId: number;

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
  ) {  super();}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const idUsuario = params['userId'];
      if (idUsuario) {
        const usuario$ = this.usuarioService.loadByID(idUsuario);
        usuario$.subscribe(usuario => {
          this.updateForm(usuario);
          this.roles = usuario.roles
          this.carregarGrupos();
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
    });
  }

  submit() {
    let msgSuccess = 'Usuário criado com sucesso!';
    let msgError = 'Erro ao criar usuario, tente novamente!';
    if (this.cadastroForm.value.id) {
      msgSuccess = 'Usuário atualizado com sucesso!';
      msgError = 'Erro ao atualizar usuario, tente novamente!';
    }

    this.usuarioService.save(this.cadastroForm.value).subscribe(
        success => {
          this.toastr.success(msgSuccess, 'Informação :)')
          this.location.back();
        },
        error => this.toastr.error(msgError, 'Opa :(')
    );
  }

  updateForm(user) {
    this.cadastroForm.patchValue({
      id: user.id,
      username: user.username,
      password: user.password,
      roles: user.roles
    });
  }

  carregarGrupos() {
    return this.grupoService.list()
        .subscribe(roles => this.roles = roles);
  }

  cancelar(){
    this.router.navigate(['/usuarios/meus-cadastros'], { relativeTo: this.route });
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
  }

}
