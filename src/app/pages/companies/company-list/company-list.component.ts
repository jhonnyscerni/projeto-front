import { Component, OnInit } from '@angular/core';
import {PersonLegal, PersonPhysical} from '../../../models/person';
import {Role} from '../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {PersonPhysicalService} from '../../../services/person-physical.service';
import {PersonLegalService} from '../../../services/person-legal.service';
import {switchMap, take} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

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
        'Confirmacao',
        'Tem certeza que deseja remover esse grupo?',
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

  onPadrinho(id){
    this.router.navigate(['/portal/gold-father', id], { relativeTo: this.route });
  }

}
