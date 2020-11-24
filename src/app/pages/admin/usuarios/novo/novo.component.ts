import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/@core/shared/base-form/base-form.component';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.scss']
})
export class NovoComponent extends BaseFormComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
    ) { 
      super(); 
    }

  ngOnInit() {

    this.cadastroForm = this.fb.group({
      usuarioId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      senha: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {

      this.usuarioService.save(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Usuario cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
