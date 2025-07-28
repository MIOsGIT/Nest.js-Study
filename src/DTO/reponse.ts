import { transferDTO } from "./transfer";

export class responseDTO{
    respond : string;
}

export class userresponse{
    ID : string;
    PW : string;
}

export class Board_Res{
    Title : string;
    Des : string;
}

export class Hi_Res{
    Hi : string;
}

export class CreateUserDto_Res {
    id: string;
    pw: string;
    name: string;
    age: number;
    isActive: boolean;
}