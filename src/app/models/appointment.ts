import {AppointmentUser} from './AppointmentUser';
import {formatDate} from '@angular/common';

export class Appointment {
    id?: string;
    dateAppointment?: Date;
    locationService?: string;
    comments?: string;
    appointmentsUsers?: AppointmentUser[] = []

    // Integração com FullCalendar
    start: string;
    title: string;
    className: string;
    groupId : string


    // constructor(id?: string, start: string, title: string,   className: string, groupId : string ) {
    //     this.id = id;
    //     this.start = start;
    //     this.title = title;
    //     this.className = className;
    //     this.groupId = groupId;
    //
    //     // const d = new Date();
    //     // const day = d.getDate();
    //     // const month = d.getMonth();
    //     // const year = d.getFullYear();
    //     //
    //     // this.start = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
    //     // this.start = formatDate(new Date(year, month, 1, 0, 0), "yyyy-MM-dd", "en");
    // }
}
