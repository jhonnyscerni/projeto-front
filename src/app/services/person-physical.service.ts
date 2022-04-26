import {Injectable} from '@angular/core';
import {CrudService} from '../@core/shared/services/crud-service';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonPhysicalService extends CrudService<User> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/persons-phisical`);
  }
}
