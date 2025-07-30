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

export class User_Req {
    id: string;
    pw: string;
    name: string;
    age: number;
}

export class Board_Req {
    id: string;
    title: string;
    description: string;
}