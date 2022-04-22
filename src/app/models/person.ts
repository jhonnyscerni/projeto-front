import {Adress} from './adress';

export abstract class Person {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string
    address?: Adress;
}

export class PersonPhysical extends Person{
    cpf?: string
    dataNascimento?: Date
    apelido?: string
    genero?: string
    zonaVotacao?: string
    secaoVotacao?: string
    padrinho?: PersonPhysical
    empresa?: PersonLegal
    observacoes?: string
}

export class PersonLegal extends Person{
    cnpj?: string
}