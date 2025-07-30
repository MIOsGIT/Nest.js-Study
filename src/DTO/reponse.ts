import { transferDTO } from "./request";

export class responseDTO{
    respond : string;
}

export class userresponse{
    ID : string;
    PW : string;
}

export class Board_Res0{
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
}
export class UpdateUserDto_Res {
    id: string;
    pw: string;
    name: string;
    age: number;
}
export class User_Res {
    id: string;
    pw: string;
    name: string;
    age: number;
}
export class Board_Res {
    id: string;
    title: string;
    description: string;
}