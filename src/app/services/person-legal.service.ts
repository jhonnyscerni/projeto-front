import { Injectable } from '@angular/core';
import {CrudService} from '../@core/shared/services/crud-service';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PersonPhysical} from '../models/person';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonLegalService extends CrudService<User> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/authuser/persons-legal`);
  }

  listMy(): Observable<PersonPhysical[]> {
    return this.http.get<PersonPhysical[]>(`${environment.urlbase}/authuser/persons-legal/my`)
        .pipe(
            catchError(super.serviceError));
  }
}
