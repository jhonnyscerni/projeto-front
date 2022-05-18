import {AppointmentUser} from './AppointmentUser';

export class Appointment {
    id?: string;
    dateAppointment?: Date;
    locationService?: string;
    comments?: string;
    appointmentsUsers?: AppointmentUser[] = []

    // Integração com FullCalendar
    start: Date;
    title: string;
    className: string;
    groupId: string

    constructor() {
        this.start = this.dateAppointment
    }
}
