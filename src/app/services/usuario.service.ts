import {CrudService} from '../@core/shared/services/crud-service';
import {User} from '../models/user';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UsuarioFilter} from '../models/filter/usuario-filter';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Page} from '../models/page/page';
import {AuthService} from '../@core/shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends CrudService<User> {

    private url: string = `${environment.urlbase}/users`;

    constructor(protected http: HttpClient,
                private authservice: AuthService) {
        super(http, `${environment.urlbase}/users`);
    }

    listSearchPage(params): Observable<Page<User>> {
        return this.http.get<Page<User>>(this.url, {params})
            .pipe(
                catchError(super.serviceError));
    }


    saveUserCommon(record: User) {
        return this.createUserCommon(record);
    }


    private createUserCommon(record: User): Observable<User> {
        return this.http
            .post(this.url + '/add-usuario-comum', record)
            .pipe(
                catchError(super.serviceError));
    }

}
