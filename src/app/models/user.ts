import { Role } from './role';
import {Person} from './person';
export class User {
    id?: number;
    username?: string;
    password?: string;
    person?: Person;
    roles?: Role[] = []
}