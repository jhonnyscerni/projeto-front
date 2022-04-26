import { Role } from './role';
import {Person, PersonPhysical} from './person';
export class User {
    id?: number;
    username?: string;
    password?: string;
    person?: PersonPhysical;
    roles?: Role[] = []
}