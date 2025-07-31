import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_ } from '../user/entity/user.entity';
import { Board_Res, User_Res } from 'src/dto/reponse';
import { Board_ } from 'src/board/entity/board.entity';
import { Board_Req, User_Req } from 'src/dto/request';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';
import { error } from 'console';
import { user_create_request_dto } from 'src/dto/user.create.request';
import { user_update_request_dto } from 'src/dto/user.update.request';
import { user_delete_request_dto } from 'src/dto/user.delete.request';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User_, 'second')
        private userRepository: Repository<User_>,
        @InjectRepository(Board_, 'second')
        private boardRepository: Repository<Board_>,
    ){}

    // 유저 리스트 조회
    async findAll_user(): Promise<User_[]> {
        return this.userRepository.find();
    }

    // 유저 생성
    async create_user(body: user_create_request_dto): Promise<void> {
        const userData = new User_();
        userData.setter(body)
        this.userRepository.save(userData);
        return;
    }
    
    // 유저 수정
    async update_user(body: user_update_request_dto): Promise<void> {
        const existUser = await this.userRepository.findOne({
            where: { id: body.id}
        });
        if (existUser) {
        await this.userRepository.update(body.id, {
            id: body.id,
            pw: body.pw,
            name: body.name,
            age: body.age,
            });
        } else {
            throw new Error('User not found');
        }
    }
    
    // 유저 삭제
    async remove_user(body: user_delete_request_dto): Promise<void> {
        await this.userRepository.delete(body);
    }
}
