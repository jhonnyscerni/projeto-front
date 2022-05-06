import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/@core/shared/services/alert-modal.service';
import { EMPTY } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  errorMessage: string;

  usuarioSelecionado: User;

  searchForm: FormGroup
  usernamecontrol: FormControl
  emailControl: FormControl

  // Paginação
  totalElements = 0;
  page = 1;
  pageElement = 0;
  size = 10


  constructor(
    private router: Router,
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

    this.usuarioService.listSearchPage(params)
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
    this.router.navigate(['/usuarios/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/usuarios/detalhe', id], { relativeTo: this.route });
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
