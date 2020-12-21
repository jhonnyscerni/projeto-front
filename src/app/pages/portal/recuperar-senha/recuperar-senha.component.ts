import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { Usuario } from './../../../models/usuario';
import { AuthService } from './../../../@core/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioRecuperarSenha } from 'src/app/models/dto/usuario-recuperar-senha';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent extends BaseFormComponent implements OnInit {

  usuario: UsuarioRecuperarSenha;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(){
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
    console.log(this.usuario)

    this.authService.recuperarLogin(this.usuario)
        .subscribe(response => {
          this.toastr.success("Foi enviado para seu e-mail uma nova senha de acesso, verifique seu email e faça Login!", 'Recuperação de senha com Sucesso :)');
          this.router.navigate(['/portal/login']);
        }, errorResponse => {
          this.toastr.error('Ocorreu um erro!', 'Opa :(')
          this.errors = ['E-mail não encontrado no sistema.']
        })
      }

}
