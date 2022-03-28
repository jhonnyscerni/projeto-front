import { filter } from 'rxjs/operators';
import { GrupoService } from 'src/app/services/grupo.service';
import { Role } from '../../../models/role';
import { UsuarioService } from './../../../services/usuario.service';
import { User } from '../../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends BaseFormComponent implements OnInit {
 
  user: User;
  userId: number;
  validarEmail: any;

  roles: Role[];
  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private grupoService: GrupoService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.carregarGrupos();
    this.route.params.subscribe((params: any) => {
      const idUsuario = params['idUsuario'];
      if (idUsuario) {
        console.log(idUsuario);
        const usuario$ = this.usuarioService.loadByID(idUsuario);
        usuario$.subscribe(usuario => {
          console.log(usuario)
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
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpf: ['', ],
      phoneNumber: ['',],
      roles: [''],
    });
  }

  updateForm(user) {
    this.cadastroForm.patchValue({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      cpf: user.cpf,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      roles: user.roles
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

  cancelar(){
    this.router.navigate(['/usuarios/lista'], { relativeTo: this.route });
  }

  carregarGrupos() {
    return this.grupoService.list()
      .subscribe(roles => this.roles = roles);
  }

  compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
}
}
