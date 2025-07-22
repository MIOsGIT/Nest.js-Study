import { Injectable } from '@nestjs/common';
import { Board, Hi, transferDTO, user } from 'src/DTO/transfer';
import { Board_Res, Hi_Res, responseDTO, userresponse } from 'src/DTO/reponse';

@Injectable()

export class HelloService {
    myID: string;
    myPW: string;
    
    constructor(){
        this.myID = "jazzb04";
        this.myPW = "alwnalwn";
    }

    // userlist : Array <string>

    // constructor(){
    //     this.userlist = [];
    // }

    getHello(): string {
        return '이것은 새다.';
    }

    logIn(body : transferDTO) {
        const check = new responseDTO();
        if(this.myID === body.ID && this.myPW === body.PW) check.respond = '로그인 성공';
        else if (this.myID === body.ID) check.respond = "비밀번호가 맞지 않습니다."
        else check.respond = "존재하지 않는 회원입니다.";
        return check;
    }
    
    UpdateUser(updateduser : user){
        const result = new userresponse();
        result.ID = updateduser.ID;
        result.PW = updateduser.PW;
        return result;
    }

    CreateBoard(body : Board){
        const bodyresult = new Board_Res();
        bodyresult.Title = body.Title;
        bodyresult.Des = body.Des;
        return bodyresult;
    }

    Hi(body : Hi){
        const Hello = new Hi_Res();
        if (body.Hi === "Hi") Hello.Hi = "Hello";
        if (body.Hi === "Hello") Hello.Hi = "Hi";
        return Hello;
    }
}