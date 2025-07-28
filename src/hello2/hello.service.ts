import { Injectable } from '@nestjs/common';
import { Board, Hi, transferDTO, user } from 'src/DTO/transfer';
import { Board_Res, Hi_Res, responseDTO, userresponse } from 'src/DTO/reponse';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity'

@Injectable()
export class HelloService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(user: User): Promise<void> {
        await this.userRepository.save(user);
    }
    
    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    // async update(id: string, user: User): Promise<void> {
    //     const existCat = await this.userRepository.findOne(id);
    //     if(existCat){
    //         await getConnection()
    //             .createQueryBuilder()
    //             .update(User)
    //             .set({ 
    //                 id: user.id,
    //                 pw: user.pw,
    //                 name: user.name, 
    //                 age: user.age,
    //             })
    //             .where("id = :id", { id })
    //             .execute();
    //     }
    // }

    myID: string;
    myPW: string;

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