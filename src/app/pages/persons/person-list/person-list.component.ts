import {Component, OnInit} from '@angular/core';
import {Role} from '../../../models/role';
import {PersonPhysical} from '../../../models/person';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {PersonPhysicalService} from '../../../services/person-physical.service';
import {switchMap, take} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  persons: PersonPhysical[];
  errorMessage: string;

  roleselected: Role;
  page:number = 1;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private alertService: AlertModalService,
      private personPhysicalService: PersonPhysicalService
  ) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.personPhysicalService.list()
        .subscribe(
            persons => this.persons = persons,
            error => this.errorMessage
        );
  }

  onEdit(id) {
    this.router.navigate(['/pessoas/editar', id], { relativeTo: this.route });
  }

  onDetalhe(id) {
    this.router.navigate(['/pessoas/detalhe', id], { relativeTo: this.route });
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
                result ? this.personPhysicalService.remove(person.id) : EMPTY,
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
