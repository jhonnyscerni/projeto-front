import {CrudService} from '../@core/shared/services/crud-service';
import {User, UserPersonLegal, UserPersonPhysical} from '../models/user';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Page} from '../models/page/page';
import {AuthService} from '../@core/shared/services/auth.service';
import {PersonLegal} from '../models/person';

@Injectable({
    providedIn: 'root'
})
export class UserService extends CrudService<User> {

    private url: string = `${environment.urlbase}/authuser/users`;

    constructor(protected http: HttpClient,
                private authservice: AuthService) {
        super(http, `${environment.urlbase}/authuser/users`);
    }

    listSearchPage(params): Observable<Page<User>> {
        return this.http.get<Page<User>>(this.url, {params})
            .pipe(
                catchError(super.serviceError));
    }

    listSearchMyPage(params): Observable<Page<User>> {
        return this.http.get<Page<User>>(`${this.url}/authuser/my/`, {params})
            .pipe(
                catchError(super.serviceError));
    }

    findByIdPersonLegal(id): Observable<UserPersonLegal> {
        return this.http.get<UserPersonLegal>(`${this.url}/authuser/${id}/person-legal`)
            .pipe(
                catchError(super.serviceError));
    }

    findByIdPersonPhysical(id): Observable<UserPersonPhysical> {
        return this.http.get<UserPersonPhysical>(`${this.url}/authuser/${id}/person-physical`)
            .pipe(
                catchError(super.serviceError));
    }

    //USerPersonLegal

    listSearchPagePersonLegal(params): Observable<Page<UserPersonLegal>> {
        return this.http.get<Page<UserPersonLegal>>(`${this.url}/authuser/person-legal`, {params})
            .pipe(
                catchError(super.serviceError));
    }

    listSearchPagePersonLegalMy(params): Observable<Page<UserPersonLegal>> {
        return this.http.get<Page<UserPersonLegal>>(`${this.url}/authuser/person-legal/my`, {params})
            .pipe(
                catchError(super.serviceError));
    }


    savePersonLegal(record: UserPersonLegal) {
        console.log(record);
        if (record['id']) {
            console.log('update!')
            return this.updateUserPersonLegal(record);
        }
        console.log('create!')
        return this.createUserLegal(record);
    }

    private createUserLegal(record: UserPersonLegal): Observable<UserPersonLegal> {
        return this.http
            .post(`${this.url}/authuser/person-legal/`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    private updateUserPersonLegal(record: UserPersonLegal): Observable<UserPersonLegal> {
        return this.http
            .put(`${this.url}/authuser/person-legal/${record['id']}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }


    //ADD
    loadByPersonIDLegal(id): Observable<UserPersonLegal> {
        return this.http.get<UserPersonLegal>(`${this.url}/person-legal/${id}`)
    }

    savePersonUserLegal(record: UserPersonLegal , personId : number  ): Observable<UserPersonLegal> {
        return this.http
            .post(`${this.url}/person-legal/${personId}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));;
    }


    //UserPersonPhysical

    listSearchPageUserPersonPhysical(params): Observable<Page<UserPersonPhysical>> {
        return this.http.get<Page<UserPersonPhysical>>(`${this.url}/person-physical`, {params})
            .pipe(
                catchError(super.serviceError));
    }

    listSearchPageUserPersonPhysicalMy(params): Observable<Page<UserPersonPhysical>> {
        return this.http.get<Page<UserPersonPhysical>>(`${this.url}/person-physical/my`, {params})
            .pipe(
                catchError(super.serviceError));
    }


    private createUserPhysical(record: UserPersonPhysical): Observable<UserPersonPhysical> {
        return this.http
            .post(`${this.url}/person-physical/`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    private updateUserPhysical(record: UserPersonPhysical): Observable<UserPersonPhysical> {
        return this.http
            .put(`${this.url}/person-physical/${record['id']}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    savePersonPhysical(record: UserPersonPhysical) {
        console.log(record);
        if (record['id']) {
            console.log('update!')
            return this.updateUserPhysical(record);
        }
        console.log('create!')
        return this.createUserPhysical(record);
    }

    //ADD
    loadByPersonID(id): Observable<UserPersonPhysical> {
        return this.http.get<UserPersonPhysical>(`${this.url}/person-physical/${id}`)
    }

    savePersonUser(record: UserPersonPhysical , personId : number  ): Observable<UserPersonPhysical> {
        return this.http
            .post(`${this.url}/person-physical/${personId}`, record)
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));;
    }


}
