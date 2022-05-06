import { Permission } from '../../../models/permission';
import { Component, OnInit } from '@angular/core';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {

  permissions: Permission[];
  errorMessage: string;

  permissionSelected: Permission;

  page:number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.permissionService.list()
    .subscribe(
      permissions => {
        this.permissions = permissions
      },
      error => this.errorMessage
    );
  }

  onEdit(id) {
    this.router.navigate(['/permissoes/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/permissoes/detalhe', id], { relativeTo: this.route });
  }

  onDelete(permission) {
    this.permissionSelected = permission;
    const result$ = this.alertService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse item?',
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap(result =>
          result ? this.permissionService.remove(permission.id) : EMPTY,
        ),
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
      );
  }

}
