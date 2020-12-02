import { UsuarioService } from './../../../services/usuario.service';
import { Usuario } from './../../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends BaseFormComponent implements OnInit {
 
  usuario: Usuario;
  idUsuario: number;
  validarEmail: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      const idUsuario = params['idUsuario'];
      if (idUsuario) {
        console.log(idUsuario);
        const usuario$ = this.usuarioService.loadByID(idUsuario);
        usuario$.subscribe(usuario => {
          this.updateForm(usuario);
          // this.cadastroForm.setValue(evento)
        });
      }
    });

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

  updateForm(usuario) {
    this.cadastroForm.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha
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
    this.router.navigate(['/usuarios/lista'], { relativeTo: this.route });
  }
}
