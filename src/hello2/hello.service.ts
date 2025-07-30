import { Injectable } from '@nestjs/common';
import { Board, Hi, transferDTO, user, CreateUserDto } from 'src/dto/request';
import { Board_Res, Hi_Res, responseDTO, userresponse, CreateUserDto_Res, Board_Res0 } from 'src/dto/reponse';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity'

@Injectable()
export class HelloService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    findAll(): Promise<CreateUserDto_Res[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<CreateUserDto_Res | null> {
        const user = await this.userRepository.findOne({
        where: { id: id }
    });
    if (!user) return null; 
    const response = new CreateUserDto_Res();
    response.id = user.id;
    response.pw = user.pw;
    response.name = user.name;
    response.age = user.age;

    return response;
}

    async create(user: CreateUserDto_Res): Promise<void> {
        const userData = new User();
        userData.setter(user)
        
        await this.userRepository.save(userData);
    }
    
    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async update(id: string, user: CreateUserDto_Res): Promise<void> {
        const existUser = await this.userRepository.findOne({
            where: { id: id}
        });
        if (existUser) {
        await this.userRepository.update(id, {
            id: user.id,
            pw: user.pw,
            name: user.name,
            age: user.age,
            });
    } else {
        throw new Error('User not found');
    }
    }

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
        const bodyresult = new Board_Res0();
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