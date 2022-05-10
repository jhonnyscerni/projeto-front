import {Address} from './address';
import {UserPersonLegal, UserPersonPhysical} from './user';

export abstract class Person {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string
    vote?: string;
    address?: Address;
    userId?: string;
}

export class PersonPhysical extends Person{
    cpf?: string
    birthDate?: Date
    surname?: string
    gender?: string
    zoneVoting?: string
    sectionVote?: string
    observation?: string
    users?: UserPersonPhysical[] = []

}

export class PersonLegal extends Person{
    cnpj?: string
    users?: UserPersonLegal[] = []
}