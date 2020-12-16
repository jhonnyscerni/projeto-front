import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { EMPTY } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.scss']
})
export class UsuarioListaComponent implements OnInit {

  usuarios: Usuario[];
  errorMessage: string;

  usuarioSelecionado: Usuario;

  searchForm: FormGroup
  nomeControl: FormControl
  emailControl: FormControl

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder) {
  }

  ngOnInit() {

    this.nomeControl = this.fb.control('')
    this.emailControl = this.fb.control('')
    this.searchForm = this.fb.group({
      nomeControl: this.nomeControl,
      emailControl: this.emailControl
    })
    this.onRefresh();
  }

  onRefresh() {
    this.usuarioService.list()
      .subscribe(
        usuarios => this.usuarios = usuarios,
        error => this.errorMessage
      );
  }

  onSearch() {
    console.log(this.nomeControl.value);
    let nome = this.nomeControl.value;
    let email = this.emailControl.value;
    let params = new HttpParams();

    if (nome && (nome = nome.trim()) !== '') {
      params = params.set('nome', nome);
    }

    if (email && (email = email.trim()) !== '') {
      params = params.set('email', email);
    }

    this.usuarioService.search(params).subscribe(
      usuarios => {
        this.usuarios = usuarios
      },
      error => this.errorMessage
    )
  }

  onEdit(id) {
    this.router.navigate(['/usuarios/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/usuarios/detalhe', id], { relativeTo: this.route });
  }

  onDelete(usuario) {
    this.usuarioSelecionado = usuario;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse usuario?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.usuarioService.remove(usuario.id) : EMPTY,
        ),
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        // error => {
        //   this.alertService.showAlertDanger(
        //     'Erro ao remover curso. Tente novamente mais tarde.',
        //   );
        // },
      );
  }

}
