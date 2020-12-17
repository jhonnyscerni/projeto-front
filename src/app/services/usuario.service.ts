import { CrudService } from '../@core/shared/services/crud-service';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioFilter } from '../models/filter/usuario-filter';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Page } from '../models/page/page';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario> {

  private url: string = `${environment.urlbase}/usuarios`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/usuarios`);
  }

  listSearchPage(params): Observable<Page<Usuario>> {
    console.log(params)
    return this.http.get<Page<Usuario>>(this.url, { params })
      .pipe(
        catchError(super.serviceError));
  }

}
