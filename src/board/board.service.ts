import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_ } from '../user/entity/user.entity';
import { Board_Res, User_Res } from 'src/dto/reponse';
import { Board_ } from './entity/board.entity';
import { Board_Req, User_Req } from 'src/dto/request';
import { board_create_reponse_dto } from 'src/dto/board.create.reponse';
import { board_findone_request_dto } from 'src/dto/board.findone.request';
import { board_update_request_dto } from 'src/dto/board.update.request';
import { board_delete_request_dto } from 'src/dto/board.delete.request';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(User_, 'second')
        private userRepository: Repository<User_>,
        @InjectRepository(Board_, 'second')
        private boardRepository: Repository<Board_>,
    ){}

    // 게시물 리스트 조회
    async findAll(): Promise<Board_[]> {
        return this.boardRepository.find();
    }

    // 게시물 상세 조회
    async findOneByUserId(dto: board_findone_request_dto): Promise<Board_[]> {
        const query = await this.boardRepository.createQueryBuilder('Board_');
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
            throw new BadRequestException('회원 정보가 일치하지 않습니다!');
        }
    }
    
    // 게시물 수정
    async update(body : board_update_request_dto): Promise<void> {
        const user_ok : User_ | null = await this.userRepository.findOne({
            where: { id: body.user_id }
        });
        if (!user_ok || user_ok.pw !== body.pw) {
            throw new BadRequestException('회원 정보가 일치하지 않습니다!');
        }
        const board = await this.boardRepository.findOne({
            where: { number: body.number },
            relations: ['user']
        });
        if (!board) {
            throw new NotFoundException('게시물이 존재하지 않습니다.');
        }
        if (board.user.id !== body.user_id) {
            throw new BadRequestException('본인이 작성한 글만 수정할 수 있습니다.');
        }
        await this.boardRepository.update(body.number, {
            title: body.title,
            description: body.description,
            createdAt: new Date(),
        })
        
    }
    
    // 게시물 삭제
    async remove(body: board_delete_request_dto): Promise<void> {
        const user_ok = await this.userRepository.findOne({
        where: { id: body.user_id }
        });

        if (!user_ok || user_ok.pw !== body.pw) {
            throw new BadRequestException('회원 정보가 일치하지 않습니다!');
        }
        const board = await this.boardRepository.findOne({
            where: { number: body.number },
            relations: ['user']
        });
        if (!board) {
            throw new NotFoundException('게시물이 존재하지 않습니다.');
        }
        if (board.user.id !== body.user_id) {
            throw new BadRequestException('본인이 작성한 글만 삭제할 수 있습니다.');
        }
        await this.boardRepository.delete(body.number);
    }
}
