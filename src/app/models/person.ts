import {Address} from './address';
import {Role} from './role';
import {UserPersonLegal, UserPersonPhysical} from './user';

export abstract class Person {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string
    vote?: string;
    address?: Address;
}

export class PersonPhysical extends Person{
    cpf?: string
    birthDate?: Date
    surname?: string
    gender?: string
    zoneVoting?: string
    sectionVote?: string
    userId?: number
    observation?: string
    users?: UserPersonPhysical[] = []

}

export class PersonLegal extends Person{
    cnpj?: string
    userId?: number
    users?: UserPersonLegal[] = []
}