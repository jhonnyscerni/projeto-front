import { environment } from './../../environments/environment';
import { CrudService } from './../@core/shared/services/crud-service';
import { Grupo } from './../models/grupo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends CrudService<Grupo> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/grupos`);
  }

}
