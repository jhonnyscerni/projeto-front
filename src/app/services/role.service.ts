import { environment } from './../../environments/environment';
import { CrudService } from './../@core/shared/services/crud-service';
import { Role } from '../models/role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/authuser/roles`);
  }

}
