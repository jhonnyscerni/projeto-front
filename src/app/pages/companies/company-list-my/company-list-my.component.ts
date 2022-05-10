import { Component, OnInit } from '@angular/core';
import {PersonLegal} from '../../../models/person';
import {Role} from '../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {PersonLegalService} from '../../../services/person-legal.service';
import {switchMap, take} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-company-list-my',
  templateUrl: './company-list-my.component.html',
  styleUrls: ['./company-list-my.component.scss']
})
export class CompanyListMyComponent implements OnInit {


  persons: PersonLegal[];
  errorMessage: string;

  roleselected: Role;
  page:number = 1;



  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private alertService: AlertModalService,
      private personLegalService: PersonLegalService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.personLegalService.list()
        .subscribe(
            persons => this.persons = persons,
            error => this.errorMessage
        );
  }

  onEdit(id) {
    this.router.navigate(['/empresas/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/empresas/detalhe', id], { relativeTo: this.route });
  }

  onDelete(person) {
    this.roleselected = person;
    const result$ = this.alertService.showConfirm(
        'Confirmação',
        'Tem certeza que deseja remover esse item?',
    );
    result$
        .asObservable()
        .pipe(
            take(1),
            switchMap(result =>
                result ? this.personLegalService.remove(person.id) : EMPTY,
            ),
        )
        .subscribe(
            success => {
              this.onRefresh();
            }
        );
  }

  onUser(id) {
    console.log(id)
    this.router.navigate(['/empresas', id, 'usuarios'], {relativeTo: this.route});

  }
}
