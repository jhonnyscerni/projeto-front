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

    listSearchMyPage(params): Observable<Page<User>> {
        return this.http.get<Page<User>>(`${this.url}/my/`, {params})
            .pipe(
                catchError(super.serviceError));
    }

    //USerPersonLegal
    savePersonLegal(record: User) {
        console.log(record);
        if (record['id']) {
            console.log('update!')
            return this.updateUserPersonLegal(record);
        }
        console.log('create!')
        return this.createUserLegal(record);
    }

    private createUserLegal(record: User): Observable<User> {
        return this.http
            .post(`${this.url}/person-legal/`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    private updateUserPersonLegal(record: User): Observable<User> {
        return this.http
            .put(`${this.url}/person-legal/${record['id']}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }


    loadByPersonIDLegal(id): Observable<User> {
        return this.http.get<User>(`${this.url}/person-legal/${id}`)
    }

    savePersonUserLegal(record: User , personId : number  ): Observable<User> {
        return this.http
            .post(`${this.url}/person-legal/${personId}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));;
    }


    //UserPersonPhysical

    private createUserPhysical(record: User): Observable<User> {
        return this.http
            .post(`${this.url}/person-physical/`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    private updateUserPhysical(record: User): Observable<User> {
        return this.http
            .put(`${this.url}/person-physical/${record['id']}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    savePersonPhysical(record: User) {
        console.log(record);
        if (record['id']) {
            console.log('update!')
            return this.updateUserPhysical(record);
        }
        console.log('create!')
        return this.createUserPhysical(record);
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
