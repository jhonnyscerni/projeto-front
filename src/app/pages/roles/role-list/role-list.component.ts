import { Role } from '../../../models/role';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { RoleService } from 'src/app/services/role.service';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-roles-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles: Role[];
  errorMessage: string; 

  roleselected: Role;
  page:number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.roleService.list()
    .subscribe(
      grupos => this.roles = grupos,
      error => this.errorMessage
    );
  }

  onEdit(id) {
    this.router.navigate(['/grupos/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/grupos/detalhe', id], { relativeTo: this.route });
  }


  onDelete(grupo) {
    this.roleselected = grupo;
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse item?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.roleService.remove(grupo.id) : EMPTY,
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

