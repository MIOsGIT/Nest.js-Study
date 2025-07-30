import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_ } from '../user/entity/user.entity';
import { Board_Res, User_Res } from 'src/dto/reponse';
import { Board_ } from 'src/board/entity/board.entity';
import { Board_Req, User_Req } from 'src/dto/request';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User_, 'second')
        private userRepository: Repository<User_>,
        @InjectRepository(Board_, 'second')
        private boardRepository: Repository<Board_>,
    ){}

    // 유저 리스트 조회
    findAll_user(): Promise<User_Res[]> {
        return this.userRepository.find();
    }

    // 유저 상세 조회
    async findOne_user(id: string): Promise<User_Res | null> {
        const user = await this.userRepository.findOne({
        where: { id: id }
    });
        if (!user) return null; 
        const response = new User_Res();
        response.id = user.id;
        response.pw = user.pw;
        response.name = user.name;
        response.age = user.age;
    
        return response;
    }

    // 유저 생성
    async create_user(user: User_Req): Promise<void> {
        const userData = new User_();
        userData.setter(user)
        await this.userRepository.save(userData);
    }
    
    // 유저 수정
    async update_user(id: string, user: User_Res): Promise<void> {
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
    
    // 유저 삭제
    async remove_user(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
