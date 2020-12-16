import { CrudService } from '../@core/shared/services/crud-service';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioFilter } from '../models/filter/usuario-filter';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/usuarios`);
  }

}
