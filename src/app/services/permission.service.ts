import { CrudService } from './../@core/shared/services/crud-service';
import { environment } from './../../environments/environment';
import { Permission } from '../models/permission';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../models/page/page';
import {User} from '../models/user';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends CrudService<Permission> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/authuser/permissions`);
  }

  listSearchPage(params): Observable<Page<Permission>> {
    return this.http.get<Page<Permission>>(`${environment.urlbase}/authuser/permissions`, {params})
        .pipe(
            catchError(super.serviceError));
  }

  list(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.urlbase}/authuser/permissions/list`)
        .pipe(
            //delay(1000),
            // tap(console.log),
            catchError(super.serviceError));
  }

}
