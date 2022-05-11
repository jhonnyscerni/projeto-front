import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from './../../../@core/shared/services/auth.service';
import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html"
})
export class ProfileComponent extends BaseFormComponent implements OnInit {

  usuario: User = new User()
  idUsuario: number;

  constructor(
    private authService: AuthService,
    private usuarioService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private location: Location,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.carregarInfo();
    this.cadastroForm = this.fb.group({
      id: [''],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      grupos: [''],
    });
  }

  carregarInfo(){
     return this.usuarioService.loadByID(this.authService.getUsuarioIdAutenticado())
        .subscribe(usuario => {
          this.usuario = usuario
          this.updateForm(this.usuario);
          console.log(this.usuario)
        })
  }

  updateForm(usuario) {
    this.cadastroForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      grupos: usuario.grupos
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess;
    let msgError;
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Usuário atualizado com sucesso!';
      msgError = 'Erro ao atualizar usuario, tente novamente!';
    }

    this.usuarioService.save(this.cadastroForm.value).subscribe(
      success => {
        //this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success(msgSuccess, 'Informação :)')
        this.location.back();
      },
      error => 
      //this.alertService.showAlertDanger(msgError),
      this.toastr.error(msgError, 'Opa :(')
    );
  }

  cancelar(){
    this.router.navigate(['/users/meus-cadastros'], { relativeTo: this.route });
  }

}
