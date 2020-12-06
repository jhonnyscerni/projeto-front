import { Permissao } from './../../../models/permissao';
import { Component, OnInit } from '@angular/core';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PermissaoService } from 'src/app/services/permissao.service';

@Component({
  selector: 'app-permissao-lista',
  templateUrl: './permissao-lista.component.html',
  styleUrls: ['./permissao-lista.component.scss']
})
export class PermissaoListaComponent implements OnInit {

  permissoes: Permissao[];
  errorMessage: string; 

  permissaoSelecionado: Permissao;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private permissaoService: PermissaoService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.permissaoService.list()
    .subscribe(
      permissoes => this.permissoes = permissoes,
      error => this.errorMessage
    );
  }

  onEdit(id) {
    this.router.navigate(['/permissoes/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/permissoes/detalhe', id], { relativeTo: this.route });
  }

  onDelete(permissao) {
    this.permissaoSelecionado = permissao;
    const result$ = this.alertService.showConfirm(
      'Confirmacao',
      'Tem certeza que deseja remover esse grupo?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.permissaoService.remove(permissao.id) : EMPTY,
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
