import { Injectable } from '@angular/core';
import {CrudService} from '../@core/shared/services/crud-service';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonLegalService extends CrudService<User> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/persons-legal`);
  }
}
