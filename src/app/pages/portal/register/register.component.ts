import { Component, OnInit } from "@angular/core";
import { User } from 'src/app/models/user';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from '../../../@core/shared/services/auth.service';

@Component({
  selector: "app-register",
  templateUrl: "register.component.html"
})
export class RegisterComponent extends BaseFormComponent implements OnInit {
 
  usuario: User;
  idUsuario: number;
  validarEmail: any;
  
  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,) {
    super();
  }

  ngOnInit() {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      phoneNumber: [''],
      cpf: ['', [Validators.required]]
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Cadastro Realizado. OBRIGADO! Enviamos um e-mail para você ativar sua conta. Caso o email não esteja na caixa de entrada, verifique sua caixa de spam/lixo eletrônico.!';
    let msgError = 'Erro ao cadastrar usuario, tente novamente!';

    this.authService.saveUserCommon(this.cadastroForm.value).subscribe(
      success => {
        // this.alertService.showAlertSuccess(msgSuccess);
        this.toastr.success('OBRIGADO! Enviamos um e-mail para você ativar sua conta. Caso o email não esteja na caixa de entrada, verifique sua caixa de spam/lixo eletrônico.!', 'Cadastro Realizado com Sucesso!')
        this.location.back();
      },
      error => 
      //this.alertService.showAlertDanger(msgError),
      this.toastr.error('Ocorreu um erro!', 'Opa :(')  
    );
  }

  canecelar(){
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

}
