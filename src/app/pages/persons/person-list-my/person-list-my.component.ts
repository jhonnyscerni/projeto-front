import { Component, OnInit } from '@angular/core';
import {PersonPhysical} from '../../../models/person';
import {Role} from '../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertModalService} from '../../../@core/shared/services/alert-modal.service';
import {PersonPhysicalService} from '../../../services/person-physical.service';
import {switchMap, take} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-person-list-my',
  templateUrl: './person-list-my.component.html',
  styleUrls: ['./person-list-my.component.scss']
})
export class PersonListMyComponent implements OnInit {
  persons: PersonPhysical[];
  errorMessage: string;

  roleselected: Role;
  page: number = 1;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private alertService: AlertModalService,
      private personPhysicalService: PersonPhysicalService
  ) {
  }

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
    this.router.navigate(['/pessoas/editar', id], {relativeTo: this.route});
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
                result ? this.personPhysicalService.remove(person.id) : EMPTY,
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
    this.router.navigate(['/pessoas', id, 'usuarios'], {relativeTo: this.route});

  }
}
