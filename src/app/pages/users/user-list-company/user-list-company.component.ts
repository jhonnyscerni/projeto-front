import {Component, OnInit} from '@angular/core';
import {UserPersonLegal, UserPersonPhysical} from '../../../models/user';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {UserService} from '../../../services/user.service';
import {switchMap, take} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
    selector: 'app-user-list-company',
    templateUrl: './user-list-company.component.html',
    styleUrls: ['./user-list-company.component.scss']
})
export class UserListCompanyComponent implements OnInit {

    users: UserPersonLegal[];
    errorMessage: string;

    usuarioSelecionado: UserPersonLegal;

    searchForm: FormGroup
    usernamecontrol: FormControl
    emailControl: FormControl

    // Paginação
    totalElements = 0;
    page = 1;
    pageElement = 0;
    size = 10


    constructor(private router: Router,
                private route: ActivatedRoute,
                private alertService: AlertModalService,
                private usuarioService: UserService,
                private fb: FormBuilder) {
    }

  getRequestParams(pageElement, size) {
    let username = this.usernamecontrol.value;
    let email = this.emailControl.value;
    let params = {};

    if (pageElement) {
      params[`page`] = pageElement;
    }

    if (size) {
      params[`size`] = size;
    }

    if (username && (username = username.trim()) !== '') {
      params[`username`] = username;
    }

    if (email && (email = email.trim()) !== '') {
      params[`email`] = email;
    }

    return params;
  }

    ngOnInit() {
      this.usernamecontrol = this.fb.control('')
      this.emailControl = this.fb.control('')
      this.searchForm = this.fb.group({
        usernamecontrol: this.usernamecontrol,
        emailControl: this.emailControl
      })
      this.onRefresh();
    }

  handlePageChange(event) {
    this.page = event;
    this.pageElement = this.page - 1
    this.onRefresh();
  }

  onRefresh() {
    const params = this.getRequestParams(this.pageElement, this.size);

    this.usuarioService.listSearchPagePersonLegal(params)
        .subscribe(
            users => {
              this.users = users.content
              this.totalElements = users.totalElements
              this.pageElement = users.number
              this.size = users.size
            },
            error => this.errorMessage
        );
  }

  onSearch() {
    this.totalElements = 0;
    this.page = 1;
    this.pageElement = 0;
    this.size = 10
    this.onRefresh()
  }

  onEdit(id) {
    this.router.navigate(['/usuarios/empresa/editar', id], { relativeTo: this.route });
  }

  onPadrinho(id){
    this.router.navigate(['/portal/gold-father', id], { relativeTo: this.route });
  }

  onDelete(usuario) {
    this.usuarioSelecionado = usuario;
    const result$ = this.alertService.showConfirm(
        'Confirmação',
        'Tem certeza que deseja remover esse item?',
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
        );
  }

}
