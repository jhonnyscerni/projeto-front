import {Component, OnInit} from "@angular/core";
import {BaseFormComponent} from 'src/app/@core/shared/base-form/base-form.component';
import {AuthService} from 'src/app/@core/shared/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from 'src/app/models/user';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, Validators, AbstractControl} from '@angular/forms';

@Component({
    selector: "app-login",
    templateUrl: "login.component.html"
})
export class LoginComponent extends BaseFormComponent implements OnInit {

    usuario: User;
    cadastrando: boolean;
    mensagemSucesso: string;
    returnUrl: string;

    focus;
    focus1;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private authService: AuthService,
    ) {
        super();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

    ngOnInit() {
        this.cadastroForm = this.fb.group({
            //email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required,]],
            password: ['', [Validators.required,]]
        });
    }

    submit() {
        this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
        console.log(this.usuario)
        this.authService
            .login(this.cadastroForm.value)
            .subscribe(response => {
                this.authService.saveToken(response)
                this.authService.getUsuarioAutenticado()
                this.authService.getAutorizacoes()
                this.returnUrl
                    ? this.router.navigate([this.returnUrl])
                    : this.router.navigate(['/dashboard']);
            }, errorResponse => {
                this.toastr.error('Ocorreu um erro!', 'Opa :(')
                this.errors = ['Usuário e/ou senha incorreto(s).']
            })

    }

    preparaCadastrar(event) {
        event.preventDefault();
        this.cadastrando = true;
    }

    cancelaCadastro() {
        this.cadastrando = false;
    }

    cadastrar() {
        this.authService
            .salvar(this.usuario)
            .subscribe(response => {
                this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
                this.cadastrando = false;
                this.usuario.email = '';
                this.usuario.password = '';
                this.errors = []
            }, errorResponse => {
                this.mensagemSucesso = null;
                this.errors = errorResponse.error.errors;
            })
    }
}


