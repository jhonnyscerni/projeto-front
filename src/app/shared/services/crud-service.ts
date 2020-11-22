import { HttpClient } from '@angular/common/http';
import { delay, tap, take, catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

export class CrudService<T> extends BaseService {

    constructor(private http: HttpClient) { super() }

    list(): Observable<T[]> {
        return this.http.get<T[]>(this.UrlServiceV1)
        .pipe(
            delay(2000),
            tap(console.log),
            catchError(super.serviceError));
    }

    loadByID(id): Observable<T> {
        return this.http.get<T>(`${this.UrlServiceV1}/${id}`)
        .pipe(
            catchError(super.serviceError));
    }

    private create(record: T): Observable<T> {
        return this.http
        .post(this.UrlServiceV1, record)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
    }

    private update(record: T): Observable<T> {
        return this.http
        .put(`${this.UrlServiceV1}/${record['id']}`, record)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));;
    }

    save(record: T) {
        if (record['id']) {
            return this.update(record);
        }
        return this.create(record);
    }

    remove(id): Observable<T> {
        return this.http.delete(`${this.UrlServiceV1}/${id}`)
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));;
    }
}