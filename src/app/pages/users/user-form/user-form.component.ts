import { filter } from 'rxjs/operators';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../../../models/role';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends BaseFormComponent implements OnInit {
 
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
  ) {
    super();
  }

  ngOnInit() {
    this.carregarGrupos();
    this.route.params.subscribe((params: any) => {
      const idUsuario = params['userId'];
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
      password: ['', [Validators.required]],
      roles: [''],
    });
  }

  updateForm(user) {
    this.cadastroForm.patchValue({
      id: user.id,
      username: user.username,
      password: user.password,
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
