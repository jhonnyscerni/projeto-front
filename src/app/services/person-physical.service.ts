import {Injectable} from '@angular/core';
import {CrudService} from '../@core/shared/services/crud-service';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PersonPhysical} from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonPhysicalService extends CrudService<User> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/persons-phisical`);
  }

  listMy(): Observable<PersonPhysical[]> {
    return this.http.get<PersonPhysical[]>(`${environment.urlbase}/persons-phisical/my`)
        .pipe(
            catchError(super.serviceError));
  }
}
