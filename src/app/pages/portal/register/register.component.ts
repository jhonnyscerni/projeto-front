import { Component, OnInit } from "@angular/core";
import { Usuario } from 'src/app/models/usuario';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: "app-register",
  templateUrl: "register.component.html"
})
export class RegisterComponent extends BaseFormComponent implements OnInit {
 
  usuario: Usuario;
  idUsuario: number;
  validarEmail: any;
  
  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,) {
    super();
  }

  ngOnInit() {
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
      senha: ['', [Validators.required]]
    });
  }

  submit() {
    console.log('submit');

    let msgSuccess = 'Usuário criado com sucesso!';
    let msgError = 'Erro ao criar usuario, tente novamente!';
    if (this.cadastroForm.value.id) {
      console.log(this.cadastroForm.value);
      msgSuccess = 'Curso atualizado com sucesso!';
      msgError = 'Erro ao atualizar curso, tente novamente!';
    }

    this.usuarioService.save(this.cadastroForm.value).subscribe(
      success => {
        this.alertService.showAlertSuccess(msgSuccess);
        this.location.back();
      },
      error => this.alertService.showAlertDanger(msgError),
    );
  }

  canecelar(){
    this.router.navigate(['/home'], { relativeTo: this.route });
  }

}
