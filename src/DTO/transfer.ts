export class transferDTO{
    ID : string;
    PW : string;
}

export class user {
    ID : string;
    PW : string;
}

export class Board {
    Title : string;
    Des : string;
}

export class Hi{
    Hi : string;
}

export class CreateUserDto {
    id: string;
    pw: string;
    name: string;
    age: number;
    isActive: boolean;
}