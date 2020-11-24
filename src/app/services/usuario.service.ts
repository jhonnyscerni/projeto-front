import { CrudService } from '../@core/shared/services/crud-service';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/usuarios`);
  }

}
