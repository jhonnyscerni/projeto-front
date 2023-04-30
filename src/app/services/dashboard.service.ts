import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    private url: string = `${environment.urlbase}/authuser/dashboard/auth`;

    constructor(protected http: HttpClient) {
    }

    countUserPerson(params): Observable<any> {
        return this.http.get<any>(this.url + "/countPersonPhysical", {params});
    }

    countUserPersonVoteIsConquistado(params): Observable<any> {
        return this.http.get<any>(this.url + "/countPersonPhysicalVoteIsConquistado", {params});
    }

    countUserPersonVoteIsAConquistar(params): Observable<any> {
        return this.http.get<any>(this.url + "/countPersonPhysicalVoteIsAConquistar", {params});
    }

    countUserPersonVoteIsPerdido(params): Observable<any> {
        return this.http.get<any>(this.url + "/countPersonPhysicalVoteIsPerdido", {params});
    }
}
