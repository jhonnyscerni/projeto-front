import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { AuthService } from 'src/app/@core/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "login.component.html"
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  usuario: Usuario;
  cadastrando: boolean;
  mensagemSucesso: string;
  
  focus;
  focus1;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    super(); 
  }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, ]]
    });
  }
  submit(){
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
    // console.log(this.usuario)
    this.authService
          .tentarLogar( this.usuario.email, this.usuario.senha)
          .subscribe(response => {
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token)
            this.router.navigate(['/portal'])
          }, errorResponse => {
            this.errors = ['Usuário e/ou senha incorreto(s).']
          })

  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    this.authService
        .salvar(this.usuario)
        .subscribe( response => {
            this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
            this.cadastrando = false;
            this.usuario.email = '';
            this.usuario.senha = '';
            this.errors = []
        }, errorResponse => {
            this.mensagemSucesso = null;
            this.errors = errorResponse.error.errors;
        })
  }
}


