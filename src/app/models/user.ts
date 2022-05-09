import { Role } from './role';
import {Person, PersonLegal, PersonPhysical} from './person';
export class User {
    id?: number;
    username?: string;
    password?: string;
    person?: Person;
    roles?: Role[] = []
}

export class UserPersonPhysical {
    id?: number;
    username?: string;
    password?: string;
}

export class UserPersonLegal {
    id?: number;
    username?: string;
    password?: string;
}