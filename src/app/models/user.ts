import { Role } from './role';
export class User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    fullName?: string;
    phoneNumber?: string;
    cpf?: string;
    roles?: Role[] = []
}