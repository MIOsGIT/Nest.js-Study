import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_ } from '../user/entity/user.entity';
import { Board_Res, User_Res } from 'src/dto/reponse';
import { Board_ } from './entity/board.entity';
import { Board_Req, User_Req } from 'src/dto/request';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';
import { board_findone_request_dto } from 'src/dto/board.findone.request';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(User_, 'second')
        private userRepository: Repository<User_>,
        @InjectRepository(Board_, 'second')
        private boardRepository: Repository<Board_>,
    ){}

    // 게시물 리스트 조회
    findAll(): Promise<Board_[]> {
        return this.boardRepository.find();
    }

    // 게시물 상세 조회
    async findOneByUserId(dto: board_findone_request_dto): Promise<Board_[]> {
        const query = this.boardRepository.createQueryBuilder('Board_');
        query.leftJoin('Board_.user', 'user');
        query.addSelect(['user.id']);
        query.where('user.id = :id', { id: dto.user_id });
        const boards = await query.getMany();
        return boards;
    }

    // 게시물 생성
    async create(body:board_create_reponse_dto): Promise<void> {
        const user_ok : User_ | null = await this.userRepository.findOne({
        where: { id: body.user_id }
        });

        if (user_ok && user_ok.pw === body.pw) {
            const boardData = new Board_();
            boardData.setter(body); 
            boardData.user = user_ok;
            await this.boardRepository.save(boardData);
        } else {
            throw new Error('User not found or password incorrect');
        }
    }
    
    // // 게시물 수정
    // async update(user: User_Res, number: number, board_new: Board_Res): Promise<void> {
    //     const user_ok = await this.userRepository.findOne({
    //         where: { id: user.id }
    //     });
    //     if (!user_ok || user_ok.pw !== user.pw) {
    //     throw new Error('User not found or password incorrect');
    //     }
    //     const board = await this.boardRepository.findOne({
    //         where: { number: number }
    //     });
    //     if (!board) {
    //         throw new Error('Board post not found');
    //     }
    //     if (board.user_id !== user.id) {
    //         throw new Error('You can only update your own posts');
    //     }
    //     await this.boardRepository.update(number, {
    //         title: board_new.title,
    //         description: board_new.description,
    //     })
        
    // }
    
    // // 게시물 삭제
    // async remove(user: User_Res, number: number): Promise<void> {
    //     const user_ok = await this.userRepository.findOne({
    //     where: { id: user.id }
    //     });

    //     if (!user_ok || user_ok.pw !== user.pw) {
    //         throw new Error('User not found or password incorrect');
    //     }
    //     const board = await this.boardRepository.findOne({
    //         where: { number: number }
    //     });
    //     if (!board) {
    //         throw new Error('Board post not found');
    //     }
    //     if (board.user_id !== user.id) {
    //         throw new Error('You can only delete your own posts');
    //     }
    //     await this.boardRepository.delete(number);
    // }
}
