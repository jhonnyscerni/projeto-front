import {CrudService} from '../@core/shared/services/crud-service';
import {User} from '../models/user';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Page} from '../models/page/page';
import {AuthService} from '../@core/shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends CrudService<User> {

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

    //Extrair para um outro Service

    saveUser(record: User) {
        return this.http
            .put(`${this.url}/person-physical/${record['id']}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    loadByPersonID(id): Observable<User> {
        return this.http.get<User>(`${this.url}/person-physical/${id}`)
    }

    savePersonUser(record: User , personId : number  ): Observable<User> {
        return this.http
            .post(`${this.url}/person-physical/${personId}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));;
    }


}
