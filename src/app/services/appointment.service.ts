import {Injectable} from '@angular/core';
import {CrudService} from '../@core/shared/services/crud-service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Appointment} from '../models/appointment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends CrudService<Appointment> {

  private url: string = `${environment.urlbase}/appointment/appointments`;

  constructor(protected http: HttpClient) {
    super(http, `${environment.urlbase}/appointment/appointments`);
  }

  listResults(): Observable<Appointment[]> {
    //console.log(params)
    return this.http.get<Appointment[]>(this.url + "/list", )
        .pipe(
            catchError(super.serviceError));
  }

}
